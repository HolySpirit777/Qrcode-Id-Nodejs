const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
var QRCode = require('qrcode');
var Grid = require('gridfs');
var qr = require('qr-image');
var Schema = mongoose.Schema;
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rifa', { useNewUrlParser: true, useUnifiedTopology: true } , function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

var codeSchema = new Schema({
    qrCode: { type: String}
});

var Code = mongoose.model('Code', codeSchema, 'code');

var qr_svg = qr.imageSync('I love QR!', { type: 'svg', size: 5 });

console.log(qr_svg);

app.listen(4000, () => {
    console.log('Server started on port 4000')
});
