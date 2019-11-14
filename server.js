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

// QRCode.toDataURL('I am a pony!', function (err, url) {
//     console.log(url + ' URL');
//   })

QRCode.toString('I am a pony!',{type:'terminal'}, async function (err, url) {
    console.log(url + ' STRING <<<<<<<<<<<<<<<<<<<<<<<');
    let cod = new Code(url);
    await cod.save(url)
});

app.listen(4000, () => {
    console.log('Server started on port 4000')
});