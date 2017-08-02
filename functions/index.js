const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.


gmailEmail = "mcfennesz@gmail.com";
gmailPassword = encodeURIComponent(functions.config().gmail.password);
mailTransport = nodemailer.createTransport(
`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'Fedthund';

exports.contactMessageAdded = functions.database.ref('contactmessages/{pushId}').onWrite(event => {
    const message = event.data.val();
    if (message.content === undefined) {
      console.log("The contactmessage content received was empty, dropping...")
      return;
    }
    sendEmail(message.subject, message.content, message.mail);
});

function sendEmail(subject, text, mail) {
  console.log(subject);
  console.log(text);
    var email = 'mcfennesz@gmail.com';
    var mailOptions = {
    from: `${APP_NAME} <noreply@fedthund.dk>`,
    to: email,
    subject: subject,
    text: "Contact message received from: " + mail + "--------> " + text
  };

  // The user unsubscribed to the newsletter.
//  mailOptions.subject = subject;
//  mailOptions.text = text;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New contact inquiry. Email sent to:', email);
  });
}