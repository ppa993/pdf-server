var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();

/*
 * localhost:3000/api/<planCode>
 */
router.get('/:planCode', function (req, res) {
  const psList = getJsonConfig();
  var fileName = getFilePathFromPlancode(psList, req.params.planCode);
  if (!fileName) res.sendStatus(404);

  var encodedFile = base64_encode(fileName);
  res.json({
    pdf: encodedFile
  })
});

/*
 * localhost:3000/api/getpdf
 */
router.post('/getpdf', function (req, res) {
  const psList = getJsonConfig();
  var fileName = getFilePathFromPlancode(psList, req.body.planCode);
  if (!fileName) res.sendStatus(404);
  var encodedFile = base64_encode(fileName);
  if (!encodedFile) res.sendStatus(500);

  res.json({
    pdf: encodedFile
  })
});



//=====================================================//



function getFilePathFromPlancode(psList, code) {
  let fileName = '';
  const productSummaries = psList.productSummaries;
  productSummaries.some(function (item) {
    const {
      plancodes
    } = item;
    if (plancodes.includes(code)) {
      fileName = item.fileName;
    }
    return plancodes.includes(code);
  });
  if (fileName) {
    return path.join(__dirname, '../public/' + fileName);
  }
  return undefined;
}

function getJsonConfig() {
  let rawData = fs.readFileSync('pslist.json');
  return JSON.parse(rawData);
}

function base64_encode(file) {
  try {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
  }
  catch (err) {
    console.log(err);
    return undefined;
  }
}

module.exports = router;