var fs = require("fs");
var request = require("request");


function ocr_request(file_path, file_name){

  var options = { method: 'POST',
    url: 'https://api.ocr.space/Parse/Image',
    headers: 
     { 'postman-token': 'ca9f1612-59e4-3bf5-cc28-7ece28bb825e',
       'cache-control': 'no-cache',
       'content-type': 'multipart/form-data; boundary=---011000010111000001101001' },
    formData: 
     { apikey: 'ceca7feab588957',
       language: 'eng',
       isOverlayRequired: 'true',
       file: 
        { value: fs.createReadStream(file_path),
          options: { filename: file_name, contentType: null } } } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

ocr_request("uploads/3319d681881c3aaeac256432fd14c9f3.png", '3319d681881c3aaeac256432fd14c9f3.png');
