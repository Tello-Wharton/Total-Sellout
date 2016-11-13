var express = require("express");
var model = require("./sellout_model.js");

var app = express();

app.listen(3000 , function() {
    console.log("running");
});

////////////////////////////////////////////////////////////////////////
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

app.use(express.static('upload'));

var request = require("request");
var fs = require('fs');
var lwip = require('lwip');

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
       isOverlayRequired: 'false',
       file: 
        { value: fs.createReadStream(file_path),
          options: { filename: file_name, contentType: null } } } };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

app.post('/upload_handler', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any
  	var tempPath = req.file.path;

    fs.rename(tempPath, tempPath + ".jpg", function(err) {
	    if ( err ) console.log('ERROR: ' + err);

	    lwip.open(tempPath + ".jpg", function(err, image){
	    	if (err) throw err;
		    image.scale(0.3, function(err, image){
			    // encode resized image to jpeg and get a Buffer object
			    
		        // save buffer to disk / send over network / etc.
		        image.writeFile(tempPath + "-1.jpg", function(err){

			    	ocr_request(tempPath + "-1.jpg", req.file.name + "-1.jpg");
				    
			    });
			});
		});
	    
		
		
	  	res.send("cake");
	});

	
});

////////////////////////////////////////////////////////////////////////
var twilio_accountSid = 'AC4b8ab878645d75095b4de7d767226ae8'; // Your Account SID from www.twilio.com/console
var twilio_authToken = "fd12f91381ef650e6199b3b301f01877";
var twilio_number = '+441202286170';

var twilio = require('twilio');
var twilio_client = new twilio.RestClient(twilio_accountSid, twilio_authToken);





////////////////////////////////////////////////////////////////////////
var commands = {

	getusers : function(request, response){

		var shop = request.query.shop;
		//var timeStart = request.query.timestart;
		//var timeEnd = request.query.timeend;
		if (shop == undefined) {

			return "Error, value needed for shop";

		}

		model.getVendorCustomerData(shop, function(err, data){
			response.send(data);
		});

		return shop;
	},

	getshops : function(request, response){

		var userid = request.query.userid;

		if (userid == undefined) {

			return "Error, value needed for userid";

		}

		/*model.getVendorCustomerData(userid, function(err, data){
			response.send(data);
		});*/

		//return userid;
	},

	advertise : function(request, response){

    	var mobileNumber


		if (mobileNumber == undefined) mobileNumber = '+447850546917';

	    twilio_client.messages.create({
	        body: request.query.message,
	        to: mobileNumber,
	        from: twilio_number // From a valid Twilio number
	    }, function(err, message) {

	    	if (err) {
	    		console.log(err);
	    	}else{
	        	console.log(message.sid);
	        }
	    });

	    response.send("Advertisment complete");

	}

};

app.get("/api", function(request, response){
	response.setHeader('Content-Type', 'application/json');

	var command = request.query.command;
	if (commands[command] == undefined) {

		response.send("Error! " + command + " is not recognised as a command.");

	}else{

		//response.send(commands[command](request));
		commands[command](request, response);

	}


});
