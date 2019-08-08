var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();


function base64_encode(file) {
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

/*
 * localhost:3000/api/base64
 */
router.get('/base64', function (req, res) {
  var fileName = path.join(__dirname, '../public/sample.pdf');
  var encodedFile = base64_encode(fileName);
  var pdfs = [];
  pdfs.push({ planCode: 'EDT1', data: encodedFile });
  res.json({
    pdfs: pdfs
  })
});

/*
 * localhost:3000/api/sample
 */
router.get('/:name', function (req, res, next) {
  var options = {
    root: path.join(__dirname, '../public'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }

  var fileName = req.params.name + '.pdf';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
});

module.exports = router;