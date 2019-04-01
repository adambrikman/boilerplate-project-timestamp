// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Timestamp Microservice
app.get('/api/timestamp/:date_string?', function(req, res, next) {
  
  // Assign end of URL to the variable 'time'
  let time = req.params.date_string

  // If time is blank (undefined), generate a new date for the current time & date
  if(time == undefined) {
    req.time = new Date();
  }
  
  // Convert input to Number if the input was in UNIX format
  else if(time !== undefined && time.indexOf('-') < 0) {
          req.time = new Date(Number(time));
    
  // Otherwise, create a new date based on what was input
  } else if (time !== undefined && time.indexOf('-') > 0) {
          // If the input date is invalid, prompt error
          if(new Date(time).toUTCString() == "Invalid Date") {
            req.time = "useless";
          } else { 
              req.time = new Date(time);
            }
  }
  next();
}, function (req, res) {
    // If input was invlid, prompt user with the following JSOn
    if(req.time == "useless") {
      res.send({"error" : "Invalid Date" });
      // Otherwise, return the expected UNIX & UTC date & time
    } else {
      res.send({unix: req.time.getTime(), utc: req.time.toUTCString()});
    }
})
