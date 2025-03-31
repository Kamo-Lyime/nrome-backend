// Amplify Configuration
import Amplify from 'aws-amplify';
import AWS from 'aws-sdk';

const amplifyConfig = {
    Auth: {
        identityPoolId: 'af-south-1:0a8f123c-7688-46ae-a71c-efa4238ad5b2',
        region: 'af-south-1',
        userPoolId: 'af-south-1_nPZFp4azj',
        userPoolWebClientId: '795ni1nlpkb2dabusrfvvjfinr',
    },
    API: {
        endpoints: [
            {
                name: "PollyReminderAPI",
                endpoint: "https://rfme92umvd.execute-api.us-east-1.amazonaws.com/Prod",
                region: "af-south-1",
            }
        ]
    }
};

Amplify.configure(amplifyConfig);

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        await Amplify.Auth.signUp({
            username,
            password,
            attributes: { email }
        });
        alert('Sign up successful. Please check your email for confirmation.');
        document.getElementById('signup').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await Amplify.Auth.signIn(username, password);
        alert('Login successful!');
        document.getElementById('login').style.display = 'none';
        document.getElementById('notification').style.display = 'block';
    } catch (error) {
    }
});

// Send Notification via Amazon SNS and Polly
async function sendNotification() {
    const message = document.getElementById('notificationMessage').value;

    // Configure AWS SDK
    AWS.config.update({
        region: 'af-south-1',
        accessKeyId: 'ASIAXQSZ2RE3S636J76Q',
        secretAccessKey: 't9whFSkvT9c+9vjZ1wWJs4jJ+mGgSF9GNh1YvJR/',
    });

    // Create Polly service object
    const polly = new AWS.Polly({ apiVersion: '2016-06-10' });

    // Synthesize speech from the message
    const paramsPolly = {
        OutputFormat: 'mp3',
        Text: message,
        VoiceId: 'Joanna'
    };

    polly.synthesizeSpeech(paramsPolly, (err, data) => {
        if (err) {
            console.log(err, err.stack);
            alert('Polly Error: ' + err.message);
        } else {
            console.log("Polly success!");
            let audioData = data.AudioStream;

            // Create SNS service object
            const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

            // Set up SNS parameters
            const paramsSNS = {
                Message: message,
                Subject: 'Notification',
                TopicArn: 'arn:aws:sns:af-south-1:718977469485:notificationTopic'
            };

            // Publish to SNS
            sns.publish(paramsSNS, (err, data) => {
                if (err) {
                    console.error("SNS Error", err);
                    alert('SNS Error: ' + err.message);
                } else {
                    console.log("SNS message ID:", data.MessageId);
                    alert('Notification sent successfully via SNS and Polly!');
                }
            });
        }
    });
}