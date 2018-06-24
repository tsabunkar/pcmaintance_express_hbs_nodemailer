require('./configuration/config')

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const hbs = require('hbs');
const port = process.env.PORT;


var app = express();

app.use(bodyParser.json()); //parsing the request and response in JSON format only
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname + '/../public')))

app.set('views', path.join(__dirname, '/../views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname + '/../views/partials'))



/* console.log(path.join(__dirname + '/../public'));
console.log(path.join(__dirname, '/../views'));
console.log(path.join(__dirname + '/../views/partials')); */

app.get('*', (request, response, next) => {
    if (request.url === '/' || request.url === '/contact' || request.url === '/about' || request.url === '/home' || request.url === '/contact/send') {
        next(); //valid urls
        return
    } else {
        response.sendFile('pagenotfound.html', {
            root: path.join(__dirname + '/../public') // response.sendfile('public/home.html');
        });

    }
})

//if u want to redirect to views/index.hbs then
app.get('/', (request, response) => {
    response.render('index.hbs', {
        title: 'Home'
    });
});
app.get('/contact', (request, response) => {
    response.render('contact.hbs', {
        title: 'Contact'
    });
});
app.get('/about', (request, response) => {
    response.render('about.hbs', {
        title: 'About'
    });
});



//if u want to redirect to public/pagenotfound.html then
/* app.get('/pagenotfound', (request, response) => {
    response.sendFile('pagenotfound.html', {
        root: path.join(__dirname + '/../public') // response.sendfile('public/home.html');
    });
}); */


app.post('/contact/send', (request, response) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail', //gmail creds who is transprting/sending this mail (Go to : https://myaccount.google.com/lesssecureapps and Allow less secure apps 'ON')
        auth: {
            user: process.env.SENDER_EMAILID,
            pass: process.env.SENDER_PASSWORD
        }
    });
    //immailhacker@gmail.com is sending an message/email to tsabunkar@gmail.com which contains the form field details
    var mailOptions = {
        from: `I M HACKER <${process.env.SENDER_EMAILID}>`, //person who is sending this email
        to: process.env.RECIEVER_EMAILID, //to whom this detail shld be send
        subject: 'Computer-Repair Form Submission',
        // text : `U have a submission with following details with Name :  ${request.body.nameId} email : ${request.body.emailId} and message : ${request.body.messageId}`,
        html: `<p>You have a submission in ur pc-repair site: </p> <ul> <li> Name : ${request.body.nameId}</li>  <li> Email : ${request.body.emailId}</li> <li>Message : ${request.body.messageId}</li></ul>`

    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            response.redirect('/')
        } else {
            console.log(`Message sent ${info.response}`);
            response.redirect('/')
        }

    })

})


app.listen(port, () => {
    console.log(`started @ ${port}`);
})