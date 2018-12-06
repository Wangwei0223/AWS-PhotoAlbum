import math
import dateutil.parser
import datetime
import time
import os
import logging
import re

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
import boto3




def get_slots(intent_request):
    return intent_request['currentIntent']['slots']
    
def close(session_attributes, fulfillment_state, message):
    response = {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }

    return response
    
def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ElicitSlot',
            'intentName': intent_name,
            'slots': slots,
            'slotToElicit': slot_to_elicit,
            'message': message
        }
    }
    
def delegate(session_attributes, slots):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Delegate',
            'slots': slots
        }
    }
    
def isvalid_phone(phone_number):
    reg = re.compile(".*?(\(?\d{3}\D{0,3}\d{3}\D{0,3}\d{4}).*?")
    return reg.match(phone_number) != None

def parse_int(n):
    try:
        return int(n)
    except ValueError:
        return float('nan')
        
def build_validation_result(is_valid, violated_slot, message_content):
    if message_content is None:
        return {
            "isValid": is_valid,
            "violatedSlot": violated_slot,
        }
    
    return {
        'isValid': is_valid,
        'violatedSlot': violated_slot,
        'message': {'contentType': 'PlainText', 'content': message_content}
    }
    
def isvalid_date(date):
    try:
        dateutil.parser.parse(date)
        return True
    except ValueError:
        return False
    
def validate_dining_suggest(location, cuisine, dining_date, dining_time, number, phone_number):
    locations = ['queens', 'staten island', 'manhattan', 'brooklyn', 'bronx']
    if location is not None and location.lower() not in locations:
        return build_validation_result(False,
                                       'location',
                                       'You could only search the area in New York, such as Queens, Staten Island, Manhattan, Brooklyn or Bronx.')
    cuisines = ['mexican', 'american', 'chinese', 'indian', 'japanese']   
    if cuisine is not None and cuisine.lower() not in cuisines:
        return build_validation_result(False,
                                       'cuisine',
                                       'I could not find {} food, would you like a different type of cuisine? '
                                       'Our most popular cuisine is Chinese'.format(cuisine))
    
    if number is not None:
        num = parse_int(number)
        if math.isnan(num):
            return build_validation_result(False, 'number', 'I don\'t understand. Can you specify a valid number?')
        if num < 1 or num > 15:
            return build_validation_result(False, 'number', 'Our restaurants could only hold 1 to 15 people for each order.')
    
    if dining_date is not None:
        if not isvalid_date(dining_date):
            return build_validation_result(False, 'dining_date', 'I did not understand that, what date would you like to eat?')
        elif datetime.datetime.strptime(dining_date, '%Y-%m-%d').date() < datetime.date.today():
            return build_validation_result(False, 'dining_date', 'You can order the dinner from today onwards.  What day would you like to eat?')
            
    if dining_time is not None:
        if len(dining_time) != 5:
            return build_validation_result(False, 'dining_time', None)
            
        hour, minute = dining_time.split(':')
        hour = parse_int(hour)
        minute = parse_int(minute)
        if math.isnan(hour) or math.isnan(minute):
            # Not a valid time; use a prompt defined on the build-time model.
            return build_validation_result(False, 'dining_time', None)
            
        if hour < 10 or hour > 22:
            # Outside of business hours
            return build_validation_result(False, 'dining_time', 'Our business hours are from ten a m. to ten p m. Can you specify a time during this range?')
    
    if phone_number is not None:
        if not isvalid_phone(phone_number):
            return build_validation_result(False, 'phone_number', 'Please enter a valid phone number.')
            
    return build_validation_result(True, None, None)
        

def dining_suggest(intent_request):
    location = get_slots(intent_request)["location"]
    cuisine = get_slots(intent_request)["cuisine"]
    number = get_slots(intent_request)["number"]
    dining_date = get_slots(intent_request)["dining_date"]
    dining_time = get_slots(intent_request)["dining_time"]
    phone_number = get_slots(intent_request)["phone_number"]
    source = intent_request['invocationSource']
    
    if source == 'DialogCodeHook':
        slots = get_slots(intent_request)
        
        validation_result = validate_dining_suggest(location, cuisine, dining_date, dining_time, number, phone_number)
        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])
                               
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}

        return delegate(output_session_attributes, get_slots(intent_request))
        
    sqs = boto3.resource('sqs')

    # Get the queue
    queue = sqs.get_queue_by_name(QueueName='DiningSQS')
    
    # Create a new message  
    response = queue.send_message(MessageBody='boto3', MessageAttributes={
        'location': {
            'StringValue': location,
            'DataType': 'String'
        },
        'cuisine': {
            'StringValue': cuisine,
            'DataType': 'String'
        },
        'number': {
            'StringValue': number,
            'DataType': 'String'
        },
        'dining_date': {
            'StringValue': dining_date,
            'DataType': 'String'
        },
        'dining_time': {
            'StringValue': dining_time,
            'DataType': 'String'
        },
        'phone_number': {
            'StringValue': phone_number,
            'DataType': 'String'
        }
    })

    # The response is NOT a resource, but gives you a message ID and MD5
    print(response.get('MessageId'))
    print(response.get('MD5OfMessageBody'))
    
    # return close(intent_request['sessionAttributes'],
    #              'Fulfilled',
    #              {'contentType': 'PlainText',
    #               'content': 'Thanks, your requirement has been placed. Here is your requirement information. \n Location: {} \n Cuisine: {} \n Dining Date: {} \n Dining Time: {} \n Number of people: {} \n Phone Number: {} \n'.format(location, cuisine, dining_time, number, phone_number)})
    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'You\'re all set. Expect my recommendations shortly! Have a good day.'})



def dispatch(intent_request):
    
    logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))
    
    intent_name = intent_request['currentIntent']['name']
    
    if intent_name == 'DiningSuggestionsIntent':
        return dining_suggest(intent_request)
        
    raise Exception('Intent with name ' + intent_name + ' not supported')

def lambda_handler(event, context):
    """
    Route the incoming request based on intent.
    The JSON body of the request is provided in the event slot.
    """
    # By default, treat the user request as coming from the America/New_York time zone.
    print "agf"
    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    logger.debug('event.bot.name={}'.format(event['bot']['name']))
    
    
    
    return dispatch(event)
