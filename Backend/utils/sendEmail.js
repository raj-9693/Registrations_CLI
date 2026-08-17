const nodemailer = require('nodemailer');

// Email bhejne ke liye reusable function
const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // ya apna SMTP provider (SendGrid, Mailgun, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password (normal password nahi)
    },
  });

  await transporter.sendMail({
    from: `"YourApp Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;