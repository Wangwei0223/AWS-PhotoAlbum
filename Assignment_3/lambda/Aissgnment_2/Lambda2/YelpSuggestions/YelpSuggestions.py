import json
import requests
import boto3
import time

def lambda_handler(event, context):
    # TODO implement
    
    sqs = boto3.resource('sqs')
    snsresponse = {"foo": "bar"}
    
        

    # Get the queue
    queue = sqs.get_queue_by_name(QueueName='DiningSQS')
    API_HOST = 'https://api.yelp.com'
    BUSINESS_PATH = '/v3/businesses/'

    
    # Process messages by printing out body and optional author name
    
    dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
    table = dynamodb.Table('DiningSuggestion')
    
    for message in queue.receive_messages(MessageAttributeNames=['All']):
        # Get the custom author message attribute if it was set
        location = ''
        categories = ''
        phonenumber = ''
        if message.message_attributes is not None:
            location = message.message_attributes.get('location').get('StringValue')
            categories = message.message_attributes.get('cuisine').get('StringValue')
            dinint_date = message.message_attributes.get('dining_date').get('StringValue')
            dinint_time = message.message_attributes.get('dining_time').get('StringValue')
            format_time = '2018-11-11'+" "+ dinint_time+":00"
            ts = time.strptime(format_time, "%Y-%m-%d %H:%M:%S")
            unixtime = time.mktime(ts)
            number = message.message_attributes.get('number').get('StringValue')
            phonenumber = message.message_attributes.get('phone_number').get('StringValue')
        
        print location
        print categories
        
        
        
        # Let the queue know that the message is processed
        message.delete()
        
        url = API_HOST + BUSINESS_PATH + 'search?' + 'term=restaurants&location='+ location +   '&categories=' + categories + '&limit=10&open_at=' + str(int(unixtime))
        headers = {'Authorization': "Bearer yCJwgghotXSwTYCGhYtNmfuMlMqYZ28pXTEMNGyvFRCANjY_NoE2VspNRjQr0NhCB9zpNCigqDJa2Bnlm5ARmUWdiuzYabZBTIoZ0A0IDd-E3fqdcvALHhGE0XbnW3Yx"}
    
        yelpresponse = requests.get(url, headers=headers)
        resmessage = 'Hello! Here are my ' + categories +' restaurant suggestions for ' + number +' people, for ' + dinint_date +' at ' + dinint_time +':\n'
        sname = []
        slocation = []
        for i in range(0,3):
            firstres = yelpresponse.json()["businesses"][i]
            resname = firstres["name"] 
            reslocationlist = firstres["location"]['display_address']
            reslocation = ''
            for item in reslocationlist:
                reslocation += item
            sname.append(resname)
            slocation.append(reslocation)
            resmessage += str(i+1) + '. ' + resname + ' at ' + reslocation + ". \n"
        
        
        
        client = boto3.client('sns')
        snsresponse = client.publish(
            PhoneNumber = '+1' + phonenumber,
            Message= resmessage + " Enjoy your meal!"
        )
        

        
        response = table.put_item(
            Item={
                'id': int(time.time()),
                'phone_number': phonenumber,
                'suggestion': {
                    'suggestion1': {
                        'restaurant_name': sname[0],
                        'restaurant_location': slocation[0]
                    },
                    'suggestion2': {
                        'restaurant_name': sname[1],
                        'restaurant_location': slocation[1]
                    },
                    'suggestion3': {
                        'restaurant_name': sname[2],
                        'restaurant_location': slocation[2]
                    }
                }
            }
        )
        
        
        
    print("PutItem succeeded:")
    # print(json.dumps(response, indent=4, cls=DecimalEncoder))
    
    
    
    
    return {
        'statusCode': 200,
        'body': 'success'
    }