var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

console.log("A1");

//app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', function(req, res){
  console.log("A2");
  res.sendFile(__dirname + '/indexRecording.html');
});

var fname = "";

console.log("A3");

io.on('connection', function(socket){

    console.log("Socket ok");

    socket.on('createfile', function (data) {

		fname = "recordings/data_"+ data.usr + "_" +  data.action  +".txt";

		 // Create the file
        fs.writeFile( fname, "# Recordings of " +  data.usr + " making movement " + data.action + " at " + new Date(Date.now()).toLocaleString() + " " +String.fromCharCode(10),

            function(err) {

                if(err){
                    console.log("Write to file failed");
                    return console.log(err);
                }

            }
        );
    });
  
    socket.on('append', function(data){

		console.log('append to file: ' + data);
	
		// Write to file
        fs.appendFile(fname, data, function(err) {
            if (err) {
                console.log(err);
                return console.log(err);
            }
        });
    });
});


http.listen(3000, function(){
  console.log('listening you on *:3000');
});