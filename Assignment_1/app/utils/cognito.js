// Modules, e.g. Webpack:
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

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

export function Confrim (code){
    var poolData = {
        UserPoolId : 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId : '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here
    };

    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : '291978313@qq.com',
        Pool : userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        console.log('call result: ' + result);
    });
}

export function Auth(username, password){
    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    var poolData = {
        UserPoolId : 'us-west-2_d1PKrQeyR', // Your user pool id here
        ClientId : '7i2i8gn6el0pb1vuqr4d3tduod' // Your client id here
    };
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
            // //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            // AWS.config.region = '<region>';

            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            //     IdentityPoolId : '...', // your identity pool id here
            //     Logins : {
            //         // Change the key below according to the specific region your user pool is in.
            //         'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
            //     }
            // });

            // //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            // AWS.config.credentials.refresh((error) => {
            //     if (error) {
            //          console.error(error);
            //     } else {
            //          // Instantiate aws sdk service objects now that the credentials have been updated.
            //          // example: var s3 = new AWS.S3();
            //          console.log('Successfully logged!');
            //     }
            // });
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },

    });
}