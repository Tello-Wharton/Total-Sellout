var express = require("express");

var app = express();

app.listen(3000 , function() {
    console.log("running");
});


app.get("/", function(request, response){

	response.send("HELLO :D :D :D ");
});

app.get("/json-test", function(request, response){
	response.setHeader('Content-Type', 'application/json');
	
	var json = {
		responses : {
			responeText : "responseText",
			responseValue : 40
		}
	};

	response.send(json);
});