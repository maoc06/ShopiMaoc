const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'xxxxxxx@gmail.com',
        pass: 'xxxxxxx'
    }
});


exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        // getting dest email by query string
        const dest = req.query.dest;
        const pass = req.query.pass;

        const mailOptions = {
            from: 'ShopiMaoc <>',
            to: dest,
            subject: 'ShopiMaoc Contraseña',
            html: `<p style="font-size: 16px;">ShopiMaoc</p>
                <br />
                <p>Usuario: ${dest}</p>
                <p>Contraseña: ${pass}</p>
            ` // email content in HTML
        };

        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');
        });
    });
});
