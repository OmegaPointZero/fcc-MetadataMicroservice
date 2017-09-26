const express = require('express');
const app = express();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/api/upload', upload.single('file'), function(req,res, next){
  if(!req.file){
    res.end('Document failed to upload. Ask the Administrator to check the logs, and try again.');
  }else if(req.file)  {
    res.json({size: req.file.size})
  }
  console.log(req.file);
});

var listener = app.listen(process.env.PORT, function () {
  console.log('App launched and listening on ' + listener.address().port);
});