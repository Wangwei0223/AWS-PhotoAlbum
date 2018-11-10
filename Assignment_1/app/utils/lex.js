import AWS from 'aws-sdk';
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

let username = 'default';
let Session = '';

export function testLex() {
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
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
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
                    'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': session.getIdToken().getJwtToken()
                }
            }, { region: 'us-west-2' });

            var cred = AWS.config.credentials;
        });
    }

    // var lexruntime = new AWS.LexRuntime();
    // var lexUserId = 'PizzaOrderingBot' + Date.now();
    // var sessionAttributes = {};
    // var params = {
    //     botAlias: '$LATEST',
    //     botName: 'PizzaOrderingBot',
    //     inputText: 'I want to order big pizza',
    //     userId: lexUserId,
    //     sessionAttributes: sessionAttributes
    // };
    // lexruntime.postText(params, function (err, data) {
    //     if (err) {
    //         console.log(err, err.stack);
    //         console.log('Error:  ' + err.message + ' (see console for details)')
    //     }
    //     if (data) {
    //         // capture the sessionAttributes for the next cycle
    //         sessionAttributes = data.sessionAttributes;
    //         // show response and/or error/dialog status
    //         console.log(data);
    //     }
    //     // re-enable input
    // });
}

export function lexRuntime(){
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:895c75a4-ca69-4ebf-b763-85f14357217f', // your identity pool id here
        Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': Session.getIdToken().getJwtToken()
        }
    }, { region: 'us-west-2' });
    var lexruntime = new AWS.LexRuntime();
    return lexruntime;
}

export function userName(){
    return username
}