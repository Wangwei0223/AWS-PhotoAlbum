import AWS from 'aws-sdk';
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

let username = 'default';
let Session = '';

export function testLex(globalSession) {
    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here // 应用程序ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    // console.log('Current User is :');
    // console.log(cognitoUser);
    AWS.config.region = 'us-east-1'; // Region
    if (!cognitoUser){
        // No Login User
        
    }
    // username = cognitoUser.username;
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            if (err) {
                // alert('cuo la', err.message || JSON.stringify(err));
                // return;
            }
            // console.log(session);
            Session = globalSession;
            // console.log(globalSession);
            // console.log('session validity: ' + globalSession.isValid());
            // console.log(globalSession.getIdToken().getJwtToken());
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
                    'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': globalSession.getIdToken().getJwtToken()
                    //Change: session.getIdToken().getJwtToken() => token
                }
            }, { region: 'us-west-2' });

            var cred = AWS.config.credentials;
        });
    }
}

export function lexRuntime(){
    var lexruntime = new AWS.LexRuntime();
    return lexruntime;
}

export function userName(){
    return username
}