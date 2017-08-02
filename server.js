var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var fs = require("fs");
var multer = require('multer')

//handling IMAGES and FORM INPUTS
app.use(express.static('public'));
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).single('file'));

app.get('/index.htm', function (req, res) {
  res.sendFile( _dirname + "/" + "index.htm")
})

//FORM INPUTS: GET
app.get('/process_get', function (req, res) {
  //prepare output in JSON format
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response))
})
//---------------------------------

//FORM INPUTS: POST
// Create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//
// app.post('/process_get', urlencodedParser, function (req, res) {
//   //prepare output in JSON format
//   response = {
//     first_name:req.body.first_name,
//     last_name:req.body.last_name
//   };
//   console.log(response);
//   res.end(JSON.stringify(response))
// })
//---------------------------------


//UPLOAD - could not get it to load picture
app.post('/file_upload', function (req, res) {
   console.log(req.files.file.name);
   console.log(req.files.file.path);
   console.log(req.files.file.type);
   var file = __dirname + "/" + req.files.file.name;

   fs.readFile( req.files.file.path, function (err, data) {
      fs.writeFile(file, data, function (err) {
         if( err ){
            console.log( err );
            } else {
               response = {
                  message:'File uploaded successfully',
                  filename:req.files.file.name
               };
            }
         console.log( response );
         res.end( JSON.stringify( response ) );
      });
   });
})


//COOKIES - an example to print all the cookies sent by the client
app.get('/', function(req, res) {
  console.log("cookies: ", req.cookies)
})
// app.listen(8081)
//---------------------


app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello GET');
})

app.post('/', function (req, res) {
  console.log("Got a POST request for the homepage");
  res.send('Hello POST')
})

app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

app.get('/list_user', function (req, res) {
  console.log("Got a GET request for /list_user")
  res.send('Page Listing')
})

app.get('/ab*cd', function(req, res) {
  console.log("Got a GET request for /ab*cd");
  res.send('Page Pattern Match')
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
