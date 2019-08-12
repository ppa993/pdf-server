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



//=====================================================//



function getFilePathFromPlancode(psList, code) {
  let fileName = '';
  let uCode = code.toUpperCase();
  const productSummaries = psList.productSummaries;
  productSummaries.some(function (item) {
    const {
      plancodes
    } = item;
    if (plancodes.includes(uCode)) {
      fileName = item.fileName;
    }
    return plancodes.includes(uCode);
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
  var bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

module.exports = router;