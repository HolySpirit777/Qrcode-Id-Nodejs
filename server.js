const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
var qr = require('qr-image');

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

function toStringQrCode(code) {
    return JSON.stringify(qr.imageSync(code, {type: 'svg', size: 10 }));
}

var saveToDb = async (value) => {           //   << saving using the package imageSync
    let cod = new Code({qrCode: value});
    await cod.save((err, code) => { 
        if (err) {
            console.log(err);
        } else {
            console.log(code);
        }
    });
}

saveToDb(toStringQrCode('SADFGSDGSD4W634634634'));

app.listen(4000, () => {
    console.log('Server started on port 4000')
});
