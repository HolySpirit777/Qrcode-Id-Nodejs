const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

var QRCode = require('qrcode')

QRCode.toDataURL('I am a pony!', function (err, url) {
    console.log(url + ' URL');
  })

QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
    console.log(url + ' STRING');
})

app.listen(3000, () => {
    console.log('Server started on port 3000')
  })