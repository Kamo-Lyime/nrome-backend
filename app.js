// AWS Amplify Configuration
import { Amplify } from 'aws-amplify';
import { Auth, API } from 'aws-amplify';

// Your AWS Amplify configuration
Amplify.configure({
    Auth: {
        region: 'af-south-1',  // Your AWS region
        userPoolId: 'af-south-1_nPZFp4azj',  // Your Cognito User Pool ID
        userPoolWebClientId: '795ni1nlpkb2dabusrfvvjfinr',  // Your Cognito App Client ID
    },
    API: {
        endpoints: [
            {
                name: "sendNotification",
                endpoint: "https://rfme92umvd.execute-api.us-east-1.amazonaws.com/Prod",  // API Gateway endpoint
                region: "af-south-1"
            }
        ]
    }
});

// Login Button Handler
document.getElementById('loginBtn').onclick = function() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
};

// Sign Up Button Handler
document.getElementById('signupBtn').onclick = function() {
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
};

// Submit Login
document.getElementById('loginSubmitBtn').onclick = async function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        await Auth.signIn(email, password);
        alert('Logged in successfully!');
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('notificationContainer').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
};

// Submit Sign Up
document.getElementById('signupSubmitBtn').onclick = async function() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await Auth.signUp({
            username: email,
            password: password,
            attributes: { email: email },
        });
        alert('Sign-up successful! You can now log in.');
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
};

// Send Notification
document.getElementById('sendNotificationBtn').onclick = async function() {
    const notificationData = { message: "Test Notification" };
    try {
        const apiResponse = await API.post('sendNotification', '/send', { body: notificationData });
        alert('Notification sent: ' + apiResponse.message);
    } catch (error) {
        alert('Error sending notification: ' + error.message);
    }
};
