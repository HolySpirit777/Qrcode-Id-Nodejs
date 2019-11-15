const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
var QRCode = require('qrcode');
var Grid = require('gridfs');
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

QRCode.toString('I am a pony!', {type:'utf8'}, function (err, url) {
    let cod = new Code();
    if (err) console.log(err);

    cod.save({qrCode: url});
    
});

app.listen(4000, () => {
    console.log('Server started on port 4000')
});
