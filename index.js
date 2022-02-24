const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var favicon = require('serve-favicon');

app.use(express.static(path.join(__dirname, '/public')));

app.use(favicon(__dirname + '/public/images/favicon.png'));

router.get('/',function(req,res){
  res.sendFile(__dirname+'/dist/html/');
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.PORT || 3000);

console.log('Running at Port 3000');