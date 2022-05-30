import {
    CognitoUserPool,
    CognitoUserAttribute, CognitoUser, AuthenticationDetails
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-2_va8apV3Pi',
    ClientId: '4km4tg5k0fbjegaegg0qqsloj9'
};
let cognitoUser;

const userPool = new CognitoUserPool(poolData);//new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
// export const getTimeDifference = function (start, end) {
//     console.log(userPool);
// }


/**
 * Signup a User
 * @param e
 */
export const signup = async function (name, email, password) {
    // signupMessage.style.display = 'none';
    // signupMessage.className = '';

    // e.preventDefault();

    // let name = document.getElementById('name').value.trim();
    // let email = document.getElementById('signup-email').value.trim();
    // let password = document.getElementById('signup-password').value.trim();

    if (name.length === 0 || email === 0 || password === 0) {
        return;
    }

    /* let attributeList = [
        new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
            Name: 'given_name', Value: name
        }),
    ]; */
    let attributeList = [
        new CognitoUserAttribute({
            Name: 'given_name', Value: name
        }),
        new CognitoUserAttribute({
            Name: 'email', Value: email
        })
    ];
    let promise = new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, null, function (err, result) {
            if (err) {
                // signupMessage.innerText = err;
                // signupMessage.style.display = 'block';
                // signupMessage.className = 'alert alert-danger';
                console.log(err)
                alert('SignUp unsuccessful, some error occurred!')
                reject(false);
            }
            else {
                cognitoUser = result.user;
                localStorage.setItem('user', cognitoUser.username);
                console.log('user name is ' + cognitoUser.getUsername());
                resolve(true);
            }

            // Show a text box to enter Confirmation code
            // document.getElementById('signup-btn').style.display = 'none';
            // document.getElementById('code-block').style.display = 'block';
            // document.getElementById('confirm-user-btn').style.display = 'inline-block';
        });
    });
    let returnValue = await promise;
    return returnValue;

}







/**
 * Confirm the user by taking the Confirmation code.
 * @param e
 */
export const confirmUser = async function (code) {

    /*    e.preventDefault(); */
    // let verificationCode = document.getElementById('code').value;

    let username = localStorage.getItem('user');
    var userData = {
        Username: username,
        Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    console.log(username);

    let promise = new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {

                /*  signupMessage.innerText = err;
                 signupMessage.style.display = 'block';
                 signupMessage.className = 'alert alert-danger'; */
                alert("the code you have entered is wrong");
                reject(false);
            }
            else {
                console.log(result);
                resolve(JSON.stringify(result));
            }

            /*  signupMessage.innerText = result;
             signupMessage.style.display = 'block';
             signupMessage.className = 'alert alert-success'; */
        });
    });

    let returnValue = await promise;
    return returnValue;
}











/**
 * Signin user with Email and Password
 * @param e
 */
export const login = async function (email, password) {
    /*     e.preventDefault(); */

    /*  let email = document.getElementById('signin-email').value;
     let password = document.getElementById('signin-password').value; */

    if (email.length === 0 || password === 0 || userPool === null || userPool === undefined) {
        /*  signinMessage.innerText = 'Fill in all fields!';
         signinMessage.style.display = 'block';
         signinMessage.className = 'alert alert-danger'; */
        return;
    }

    let authenticationData = {
        Username: email,
        Password: password,
    };

    let authenticationDetails = new AuthenticationDetails(authenticationData);

    let userData = {
        Username: email,
        Pool: userPool
    };

    let cognitoUser = new CognitoUser(userData);
    let promise = new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                /* signinMessage.innerText = 'Authentication Success!';
                signinMessage.style.display = 'block';
                signinMessage.className = 'alert alert-success'; */

                /*  document.getElementById('token-section').style.display = 'block';
                 document.getElementById('signin-btn').style.display = 'none'; */
                console.log(result);
                let cognitoUseree = userPool.getCurrentUser();
                console.log(cognitoUseree)
                // Decode ID Token
                let idToken = result.idToken.jwtToken;
                /*   document.getElementById('id-token').innerText = idToken;
                  document.getElementById('decoded-id-token').appendChild(parseIdToken(idToken));
    */
                // Decode Access Token
                /*   let accessToken = result.getAccessToken().getJwtToken();
                  document.getElementById('access-token').innerText = accessToken;
                  document.getElementById('decoded-access-token').appendChild(parseAccessToken(accessToken));
    */
                /*     let cognitoUser = userPool.getCurrentUser(); */

                /*   if (cognitoUser != null) {
                      cognitoUser.getSession(function (err, result) {
                          if (result) {
                              // Set the region where your identity pool exists (us-east-1, eu-west-1)
                              AWS.config.region = region;
                              AWS.config.update({region: region});
    
                              logins = {};
                              let key = 'cognito-idp.us-east-2.amazonaws.com/' + userPoolId;
                              logins[key] = result.getIdToken().getJwtToken();
    
                              // Add the User's Id Token to the Cognito credentials login map.
                              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                                  IdentityPoolId: identityPoolId,
                                  Logins: logins,
                              });
    
                              // Make the call to obtain credentials
                              AWS.config.credentials.get(function () {
                                  // Credentials will be available when this function is called.
                                  var accessKeyId = AWS.config.credentials.accessKeyId;
                                  var secretAccessKey = AWS.config.credentials.secretAccessKey;
                                  var sessionToken = AWS.config.credentials.sessionToken;
                              });
    
                              if (s3BucketName.length > 0)
                                  listS3Bucket(s3BucketName);
                          }
                      });
                  } */
                resolve(result);
            },
            onFailure: function (err) {

                reject(err?.message);

            }
        }
        );
    })
    let returnValue = await promise;
    return returnValue;

} 
