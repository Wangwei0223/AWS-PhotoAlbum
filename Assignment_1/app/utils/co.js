var AWS = require('aws-sdk');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

let username = 'default';
let Session = '';

let token = 'eyJraWQiOiJRRjc5QkxUWnFSSEQ0bTdQRmZDNVduVlM3MGg4K1wvWG1ocVRYd1lUTnZiZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ODY4NWQ1NS03ZDNkLTRlN2ItYTE0MC05NTY5YTRjMGY5ZmYiLCJldmVudF9pZCI6Ijk0MTFkNjBlLWU1NjMtMTFlOC04MWVmLTE3OTM1YWU1YzMyZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NDE5MDc2NDgsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy13ZXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtd2VzdC0yX2QxUEtyUWV5UiIsImV4cCI6MTU0MTkxMTI0OCwiaWF0IjoxNTQxOTA3NjQ4LCJqdGkiOiI5ZWQzMjJjZi04NTAxLTQ0YzktOTdhZS1jMzE0MzMwOGE0NjciLCJjbGllbnRfaWQiOiI3aTJpOGduNmVsMHBiMXZ1cXI0ZDN0ZHVvZCIsInVzZXJuYW1lIjoiNTg2ODVkNTUtN2QzZC00ZTdiLWExNDAtOTU2OWE0YzBmOWZmIn0.fg0O8GDysK3MVq12Nelt23eCsaFPo0ZskpTo3uEd-fb4gBDhkdYh-Mcja4QdV2ERwwFO65_OVSwAwaPuMHgJTRyFqAjNJDDISUIHFc0dZAlpc9eZeaEi4DviAfqPcN7yhtfoVjju2RxXzh5UbhRQn0Gx8owrOu2aJ2Kf8CcRUv3MmlHSNU0XGPl6f6mazZHsZ9SlJJGJ9DWEi2_NyHdF76HUu8ul-PohXEe61NyInQlULrVV-ovHHElMaWSrZrIc9dvQ3La7Kq93U0BOB2AtWOcT_v0YJUMO2JxcdoXvCa6ecVhgdm6e671dAELpJX32uK1foAU44aSKsD-O4ZaPAA'

exports.handler = async (event) => {
    // TODO implement
    let res = await testLex(event.inputmessage);
    const response = {
        statusCode: 200,
        body: JSON.stringify(res)
    };
    return response;
};


function testLex(inputmessage) {
    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here // 应用程序ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    console.log('Current User is :');
    console.log(cognitoUser);
    username = cognitoUser.username;
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            // if (err) {
            //     alert(err.message || JSON.stringify(err));
            //     return;
            // }
            Session = session;
            console.log('session validity: ' + session.isValid());
            //NOTE: getSession must be called to authenticate user before calling getUserAttributes
            cognitoUser.getUserAttributes(function (err, attributes) {
                if (err) {
                    // Handle error
                } else {
                    // Do something with attributes
                }
            });
            AWS.config.region = 'us-east-1'; // Region
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:895c75a4-ca69-4ebf-b763-85f14357217f', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': token
                }
            }, { region: 'us-west-2' });

            var cred = AWS.config.credentials;
        });
    }

    var lexruntime = new AWS.LexRuntime();
    var lexUserId = 'PizzaOrderingBot' + Date.now();
    var sessionAttributes = {};
    var params = {
        botAlias: '$LATEST',
        botName: 'PizzaOrderingBot',
        inputText: inputmessage,
        userId: lexUserId,
        sessionAttributes: sessionAttributes
    };
    lexruntime.postText(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            console.log('Error:  ' + err.message + ' (see console for details)')
        }
        if (data) {
            // capture the sessionAttributes for the next cycle
            sessionAttributes = data.sessionAttributes;
            // show response and/or error/dialog status
            console.log(data);
            return data;
        }
        // re-enable input
    });
}