const admin = require('firebase-admin');
const serviceAccount = require('../service_account.json');
const { PhoneAuthProvider } = require('firebase-admin');
const { RecaptchaVerifier } = require('firebase-admin');

// Initialize the Firebase Admin SDK if it's not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports.sendVerificationCode = async (request, response) => {
  const phoneNumber = request.body.phoneNumber;

  console.log("phoneNumber: ", phoneNumber);

  try {
    const appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("reCAPTCHA response: ", response);

        // Now, send the verification code to the user's phone number
        const phoneProvider = new PhoneAuthProvider(admin.auth());
        phoneProvider.verifyPhoneNumber(phoneNumber, appVerifier)
          .then((verificationId) => {
            console.log("verificationId: ", verificationId);
            response.status(200).json({ success: true, verificationId: verificationId });
          })
          .catch((error) => {
            console.error('Error sending verification code:', error);
            response.status(500).json({ success: false, error: error.message });
          });
      }
    });

    appVerifier.verify();
  } catch (error) {
    console.error('Error initializing reCAPTCHA:', error);
    response.status(500).json({ success: false, error: error.message });
  }
};
