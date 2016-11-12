var request = require("request");

var options = { method: 'POST',
  url: 'https://api.ocr.space/Parse/Image',
  headers: 
   { 'postman-token': '7c5c9127-3220-d744-14bc-a902ba472099',
     'cache-control': 'no-cache',
     'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
  formData: 
   { apikey: 'ceca7feab588957',
     language: 'eng',
     isOverlayRequired: 'true',
     url: 'https://secure.tesco.com/BrandGuarantee/Content/images/Receipt_Rip.jpg',
     '': '' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
