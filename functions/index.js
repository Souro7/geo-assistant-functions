const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'art.vandalay1800@gmail.com',
        pass: '********'
    }
});

exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log('Test');
 response.send("Hello from Firebase!");
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
      
        const dest = req.query.dest;

        const mailOptions = {
            from: 'art.vandalay1800@gmail.com',
            to: dest,
            subject: 'Subject has entered the geofence!',
            html: `<h2 style="font-size: 16px;">Attention!!!</h2>
                <br />
                <p>The subject has entered the geofence!!</p>
            `
        };
  
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sent mail');
        });
    });    
});
