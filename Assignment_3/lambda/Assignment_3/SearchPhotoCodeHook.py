import math
import dateutil.parser
import datetime
import time
import os
import logging
import re
import requests
import json
from requests_aws4auth import AWS4Auth

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
    
def search(firstLabel, secondLabel):
    host = 'https://vpc-photo-hvy4wfq763nmzdhjwbku6nmtyu.us-east-1.es.amazonaws.com' # the Amazon ES domain, including https://
    index = 'photo'
    url = host + '/' + index + '/_search'
    
    region = 'us-east-1' # e.g. us-west-1
    service = 'es'
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)
    headers = { "Content-Type": "application/json" }
    
    label = firstLabel
    # print secondLabel
    if secondLabel:
        label = label + ' OR ' + secondLabel
    
    # print url
    
    document = {
        # "size": 5,
        "sort": {
            "createdTimestamp": {
            "order": "desc"
            }
        },
        "query": {
            "query_string": {
                "default_field": "labels",
                "query": label
            }
        }
    }
    
    print label
    response = requests.post(url, auth=awsauth, json=document, headers=headers).json()
    list = []
    for item in response["hits"]["hits"]:
        list.append(item["_source"]["objectKey"])
        
    return list
    

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

def validate_search(firstLabel, secondLabel):
    return build_validation_result(True, None, None)

def photo_search(intent_request):
    firstLabel = get_slots(intent_request)["firstLabel"]
    secondLabel = get_slots(intent_request)["secondLabel"]
    source = intent_request['invocationSource']
    
    if source == 'DialogCodeHook':
        slots = get_slots(intent_request)
        
        validation_result = validate_search(firstLabel, secondLabel)
        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(intent_request['sessionAttributes'],
                               intent_request['currentIntent']['name'],
                               slots,
                               validation_result['violatedSlot'],
                               validation_result['message'])
                               
        output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
        
        return delegate(output_session_attributes, get_slots(intent_request))
    
    l = search(firstLabel, secondLabel)
    if not l:
        return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': 'Sorry. I could not find any images you want.'})
    result = []
    l =  list(set(l))
    # for image in list:
    #     result.append(image)
    print 'dghdjfgjhdtyfgkujfhdgsrtdjhsdhdyjtudk'
    return close(intent_request['sessionAttributes'],
                 'Fulfilled',
                 {'contentType': 'PlainText',
                  'content': json.dumps(l)})
    

def dispatch(intent_request):
    
    logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))
    
    intent_name = intent_request['currentIntent']['name']
    
    if intent_name == 'SearchIntent':
        return photo_search(intent_request)
        
    raise Exception('Intent with name ' + intent_name + ' not supported')

def lambda_handler(event, context):
    # TODO implement
    os.environ['TZ'] = 'America/New_York'
    time.tzset()
    logger.debug('event.bot.name={}'.format(event['bot']['name']))
    
    
    
    return dispatch(event)
