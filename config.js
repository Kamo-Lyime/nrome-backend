// config.js

module.exports = {
    mongodb: {
        url: process.env.MONGODB_URL || 'mongodb://localhost:27017/medication-delivery'
    },
    email: {
        service: 'smtp',
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }
};