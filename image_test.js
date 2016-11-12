var fs = require('fs');
var path = require('path')
var express = require("express");

//////////////////
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

/////////////////

var app = express();

app.listen(3000 , function() {
    console.log("running");
});

app.use(express.static('upload'));
// ...

/*
app.post('/upload_handler', function (req, res) {
    var tempPath = req.file.path,
        targetPath = path.resolve('./uploads/image.png');
    if (path.extname(req.files.file.name).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }
    // ...
});
*/


app.post('/upload_handler', upload.single('file'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any
  	var tempPath = req.file.path;

    fs.rename(tempPath, tempPath + ".png", function(err) {
	    if ( err ) console.log('ERROR: ' + err);

	    /*
	    fs.rename(tempPath, targetPath, function(err) {
	        if (err) throw err;
	        console.log("Upload completed!");
	    });
	    */
		
	  	res.send("cake");
	});

	
});