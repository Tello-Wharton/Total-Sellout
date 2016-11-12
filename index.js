var express = require("express");

var app = express();

app.listen(3000 , function() {
    console.log("running");
});

var commands = {

	getshops : function(request){
		return "cake";
	}
};

app.get("/", function(request, response){
	response.setHeader('Content-Type', 'application/json');
	
	var command = request.query.command;

	response.send(commands[command](request));


});
