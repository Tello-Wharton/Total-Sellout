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
	if (commands[command] == undefined) {

		response.send("Error! " + command + " is not recognised as a command.");

	}else{

		response.send(commands[command](request));
		
	}


});
