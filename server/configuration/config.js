var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json')

    if (env === 'development') {
        process.env.PORT = config.development.PORT;
        process.env.SENDER_EMAILID = config.development.SENDER_EMAILID_SECERT;
        process.env.SENDER_PASSWORD = config.development.SENDER_PASSWORD_SECERT;
        process.env.RECIEVER_EMAILID = config.development.RECIEVER_EMAILID_SECERT;
    } else {
        process.env.PORT = config.test.PORT;
        process.env.SENDER_EMAILID = config.development.SENDER_EMAILID_SECERT;
        process.env.SENDER_PASSWORD = config.development.SENDER_PASSWORD_SECERT;
        process.env.RECIEVER_EMAILID = config.development.RECIEVER_EMAILID_SECERT;
    }


}