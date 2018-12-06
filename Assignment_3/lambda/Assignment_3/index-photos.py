import boto3
import re
import requests
from requests_aws4auth import AWS4Auth
import time

region = 'us-east-1' # e.g. us-west-1
service = 'es'
credentials = boto3.Session().get_credentials()
awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

host = 'https://vpc-photo-hvy4wfq763nmzdhjwbku6nmtyu.us-east-1.es.amazonaws.com' # the Amazon ES domain, including https://
index = 'photo'
type = 'image'
url = host + '/' + index + '/' + type

headers = { "Content-Type": "application/json" }

s3 = boto3.client('s3')

# Regular expressions used to parse some simple log lines
ip_pattern = re.compile('(\d+\.\d+\.\d+\.\d+)')
time_pattern = re.compile('\[(\d+\/\w\w\w\/\d\d\d\d:\d\d:\d\d:\d\d\s-\d\d\d\d)\]')
message_pattern = re.compile('\"(.+)\"')

# Lambda execution starts here
def lambda_handler(event, context):
    print event
    client=boto3.client('rekognition')
    for record in event['Records']:

        # Get the bucket name and key for the new file
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        timestampe = record['eventTime']
        response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':key}}, MaxLabels = 10, MinConfidence = 80)
        labels = []
        for label in response['Labels']:
            labels.append(label['Name'])
            print (label['Name'] + ' : ' + str(label['Confidence']))
        #localtime = time.asctime( time.localtime(time.time()) )
        document = {
            "objectKey": key,
            "bucket": bucket,
            "createdTimestamp": timestampe,
            "labels": labels
        }
        r = requests.post(url, auth=awsauth, json=document, headers=headers)