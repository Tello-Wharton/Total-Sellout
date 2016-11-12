var express = require("express");

var app = express();

app.listen(3000 , function() {
    console.log("running");
});

app.get("/", function(request, response){

	var command = request.query.command;

	response.send(command);


});
