import math
import dateutil.parser
import datetime
import time
import os
import logging
import re
import requests
from requests_aws4auth import AWS4Auth
import json

import boto3

def lambda_handler(event, context):
    client = boto3.client('lex-runtime')
    
    response = client.post_text(
        botName='SearchPhotos',
        botAlias='$LATEST',
        userId='John',
        sessionAttributes={
            'string': 'string'
        },
        requestAttributes={
            'string': 'string'
        },
        inputText= event['q']
    )
    # image = response['message']
    # return event
    res = []
    for item in json.loads(response['message']):
        res.append("https://s3.amazonaws.com/jingyao-photo/" + item)
    
    return res

