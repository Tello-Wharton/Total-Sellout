var express = require("express");
var model = require("./sellout_model.js");

var app = express();

app.listen(3000 , function() {
    console.log("running");
});

var commands = {

	getusers : function(request){

		var shop = request.query.shop;
		//var timeStart = request.query.timestart;
		//var timeEnd = request.query.timeend;
		if (shop == undefined) {

			return "Error, value needed for shop";

		}


		return shop;
	},

	getshops : function(request){

		var userid = request.query.userid;

		if (userid == undefined) {

			return "Error, value needed for userid";

		}

		return userid;
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
