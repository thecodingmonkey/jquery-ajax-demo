var express = require('express');
var bodyParser = require('body-parser');
var escape = require('escape-html');

var app = express();

var messageData = [];

app.use( bodyParser.json() );  // parses json posts
app.use(bodyParser.urlencoded({ extended: true })); // parses standard requests

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/chat', function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.sendFile(__dirname + '/chat.html');
});

app.get('/getjson', function (req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.send(messageData);
});

app.post('/post', function (req, res) {
  var name, msg;

  name = req.body.name;
  msg = req.body.message;

  var chatMsg = {
    name: name,
    message: "[POST] " + msg
  };

  messageData.push(chatMsg);

  res.set("Access-Control-Allow-Origin", "*");
  res.send(req.query);
});

app.get('/post', function (req, res) {
  var name, msg;
  name = req.query.name;
//  msg = querystring.escape(req.query.message);
  msg = req.query.message;
  msg = escape(req.query.message);

  // if (msg.indexOf('script') != -1) {
  //   return;
  // }

  var chatMsg = {
    name: name,
    message: msg
  };

  messageData.push(chatMsg);

  res.set("Access-Control-Allow-Origin", "*");
  res.send(req.query);
});

app.get('/list', function (req, res) {
  var header = "<html><head>" +
          '<meta http-equiv="refresh" content="1">' +
          "<title>DevLeague BBS</title></head><body>";
  var footer = "</body></html>";

  var data = "";
  var i;

  for(i=messageData.length-1; i >= 0; i--) {
    data += "&lt;" + messageData[i].name + "&gt; " + messageData[i].message.substr(0,200) + "<br/>"; 
  }

  res.set("Access-Control-Allow-Origin", "*");
  res.send(header + data + footer);

});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;
 
  console.log('Example app listening at http://%s:%s', host, port);

});