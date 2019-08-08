var express = require('express');
var router = express.Router();
var path = require('path');


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