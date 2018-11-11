// Modules, e.g. Webpack:
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import AWS from 'aws-sdk';
import axios from 'axios';
import sigV4Client from './sigV4Client';

export function RegisterUser() {
    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: '291978313@qq.com'
    };

    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: '+19294548495'
    };
    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);

    userPool.signUp('291978313@qq.com', 'Ww950223_', attributeList, null, function (err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

export function Confrim(code) {
    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: '291978313@qq.com',
        Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
            (err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });
}

export function Auth(username, password) {
    var authenticationData = {
        Username: username,
        Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
        },

        onFailure: function (err) {
            alert(err.message || JSON.stringify(err));
        },

    });
}

export function Session() {  // 产生Credential 用产生的accessKey secrectKey sessionToken 作为Auth附加在header中去请求apigate way
    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here // 应用程序ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    console.log('');
    console.log(cognitoUser);
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('session validity: ' + session.isValid());
            //NOTE: getSession must be called to authenticate user before calling getUserAttributes
            cognitoUser.getUserAttributes(function (err, attributes) {
                if (err) {
                    // Handle error
                } else {
                    // Do something with attributes
                }
            });

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-west-2:895c75a4-ca69-4ebf-b763-85f14357217f', // your identity pool id here
                Logins: {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': session.getIdToken().getJwtToken()
                }
            }, { region: 'us-west-2' });

            var cred = AWS.config.credentials;

            cred.refresh(function (err) {
                if (err) console.log(err);
                else {
                    let accessKey = cred.accessKeyId;
                    let secretKey = cred.secretAccessKey;
                    let sessionToken = cred.sessionToken;
                    let region = 'us-west-2';
                    console.log('accessKey: ' + accessKey);
                    console.log('secretKey: ' + secretKey);
                    console.log('sessionToken:' + sessionToken);
                    let client = sigV4Client.newClient({
                        // Your AWS temporary access key
                        accessKey: accessKey,
                        // Your AWS temporary secret key
                        secretKey: secretKey,
                        // Your AWS temporary session token
                        sessionToken: sessionToken,
                        // API Gateway region
                        region: region,
                        // API Gateway URL
                        endpoint: 'https://sr0igfw871.execute-api.us-west-2.amazonaws.com/demo'
                    });
                    let request = client.signRequest({
                        method: 'GET',
                        path: '',
                        headers: {},
                        queryParams: {},
                        body: {}
                    });

                    console.log(request);

                    // const results = fetch(request.url, {
                    //     method: 'GET',
                    //     headers: request.headers,
                    // }).then(function(data){
                    //     console.log(data);
                    // });
                    axios.defaults.headers = request.headers;
                    axios.get('https://sr0igfw871.execute-api.us-west-2.amazonaws.com/demo').then(function (data) {
                        console.log(data);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            });

        });
    }
}

export function confrimLogin() {
    var poolData = {
        UserPoolId: 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId: '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here // 应用程序ID
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    console.log('wei user');
    console.log(cognitoUser);
    if (cognitoUser != null) {
        cognitoUser.getSession(function (err, result) {
            if (result) {
                console.log('You are now logged in.');
                // Add the User's Id Token to the Cognito credentials login map.
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-2:895c75a4-ca69-4ebf-b763-85f14357217f',
                    Logins: {
                        'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': result.getIdToken().getJwtToken()
                    }
                });
            }
        });
    }
}

export function mockLogin() {
    var location = window.location.href;
    var idToken_access = location.split('id_token=')[1].split('&expires_in=')[0];
    var idToken = idToken_access.split('&access_token=')[0];
    var access_token = idToken_access.split('&access_token=')[1];
    localStorage.setItem('CognitoIdentityServiceProvider.7i2i8gn6el0pb1vuqr4d3tduod.58685d55-7d3d-4e7b-a140-9569a4c0f9ff.idToken', idToken);
    localStorage.setItem('CognitoIdentityServiceProvider.7i2i8gn6el0pb1vuqr4d3tduod.LastAuthUser', '7eca1b6e-bf91-4c1a-be01-01b415041fc7');
    localStorage.setItem('CognitoIdentityServiceProvider.7i2i8gn6el0pb1vuqr4d3tduod.7eca1b6e-bf91-4c1a-be01-01b415041fc7.clockDrift', 0);
    localStorage.setItem('CognitoIdentityServiceProvider.7i2i8gn6el0pb1vuqr4d3tduod.7eca1b6e-bf91-4c1a-be01-01b415041fc7.accessToken', access_token);
    localStorage.setItem('aws.cognito.identity-providers.us-west-2:895c75a4-ca69-4ebf-b763-85f14357217f', 'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR');
    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:895c75a4-ca69-4ebf-b763-85f14357217f', // your identity pool id here
        Logins: {
            // Change the key below according to the specific region your user pool is in.
            'cognito-idp.us-west-2.amazonaws.com/us-west-2_d1PKrQeyR': idToken
            //Change: session.getIdToken().getJwtToken() => token
        }
    }, { region: 'us-west-2' });

}