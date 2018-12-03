# AWS-ChatBot
========================================================================================================================

### Assignment_2

Group Members:

1. Wei Wang    ww1306
2. Jingyao Li  jl9075
3. Kuan Chen   kc3422
4. Guanhua Chen gc2229


folder: app:Our front end code using Vue.js
folder:
    lambdas:
    
    lex(Lambda1):
        GreetingCodeHook: 
        DiningSuggestionsCodeHook: get info from users & send to SQS queue
        ThankyouCodeHook: 
    
    Lambda2:
        Get info from SQS and send this info to yelp api & get suggestions back from yelp
        Send suggestions to your phone using SNS
        Save suggestions to DynamoDB

s3 link:
https://weiwang.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=7i2i8gn6el0pb1vuqr4d3tduod&redirect_uri=https://s3-us-west-2.amazonaws.com/chatbotresource/views/index2.html

For loginin: you can use our test account:
account: ww1306@nyu.edu
password:1234567890Ww_

Or you can sign up yourself.



========================================================================================================================




