const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const qr = require('qr-image');
const randomId = require('random-id');

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rifa', { useNewUrlParser: true, useUnifiedTopology: true } , function (err) {

   if (err) throw err;
 
   console.log('Successfully connected');
 
});

var Schema = mongoose.Schema;

var codeSchema = new Schema({
    qrCode: { type: String}
});

var Code = mongoose.model('Code', codeSchema, 'code');

function QrCodetoString(code) {

    return JSON.stringify(qr.imageSync(code, {type: 'svg', size: 10 }));     //   << Converts string to QRcode and then to string

}

var saveToDb = async (value) => {

    let cod = new Code({qrCode: value});

    await cod.save((err, code) => { 
        if (err) {

            console.log(err);

        } else {

            console.log('The Qrcode was saved in the database rifa');

            Code.find((err, code) => {       // << Query of the QRcode

                if(err) console.log(err);
                if(code) console.log(code);

            });
        }
    });
}

let ticketIdCode = randomId(10, 'A0');
let secretIdCode = randomId(12, 'A0')

saveToDb(QrCodetoString(secretIdCode));

console.log('The ticket ID code: ' + ticketIdCode);
console.log('The secret ID code: ' + secretIdCode);

app.listen(4000, () => {
    console.log('Server started on port 4000');
});
