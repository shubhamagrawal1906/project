var express = require('express');
var path = require('path');
var app = express();

app.use('/app',express.static(path.join(__dirname,'app')));
app.use('/partials',express.static(path.join(__dirname,'partials')));
app.use('/static',express.static(path.join(__dirname,'static')));
app.use('/json',express.static(path.join(__dirname,'json')));
app.get('/',function(req,res){
  res.sendFile(path.join( __dirname, 'index.html'));
});
app.listen('8080', function(){
  console.log("The http://127.0.0.1:8080/ is listening");
});
