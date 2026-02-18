const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server: ', error);
    } else {
        console.log('Email server is ready to send messages');
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backend Bank" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: ', error);
        throw error;
    }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = "Welcome to Backend Bank 🎉";

    const text = `
Hi ${name},

Welcome to Backend Bank!

Your account has been successfully created.

If you did not create this account, please contact support immediately.

Regards,
Backend Bank Team
`;

    const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
    <h2 style="color: #2c3e50;">Welcome to Backend Bank, ${name}! 🎉</h2>
    
    <p>Your account has been successfully created.</p>
    
    <p>You can now securely log in and manage your banking activities.</p>

    <hr />

    <p style="font-size: 14px; color: gray;">
        If you did not create this account, please contact our support team immediately.
    </p>

    <p>Regards,<br/>Backend Bank Team</p>
</div>
`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = { 
    transporter,
    sendEmail,
    sendRegistrationEmail 
};
