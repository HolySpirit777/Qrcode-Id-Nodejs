const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
var QRCode = require('qrcode');
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rifa', { useNewUrlParser: true, useUnifiedTopology: true } , function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

var codeSchema = mongoose.Schema({
    qrCode: String
});

var Code = mongoose.model('Code', codeSchema, 'code');

QRCode.toString('I am a pony!', {type:'utf8'}, async function (err, url) {
    let cod = new Code();
    if (err) console.log(err);

    await cod.save({qrCode: url}, (err, code) => {
        if (err) {
            console.log(err);
        } else {
            console.log(code);
        }
    });
    
});

app.listen(4000, () => {
    console.log('Server started on port 4000')
});
