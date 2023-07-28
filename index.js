var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer =  require("multer");
var app = express();

const upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//connect with mongodb
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((_) => {
  console.log("Mongodb Connection Successful!");
})
.catch((err) => {
  console.log("Error in connecting the db",err)
})

app.use("/api/fileanalyse", bodyParser.urlencoded({extended: false}))

app.post("/api/fileanalyse", upload.single('upfile'), function(req, res){
  // if(err){
  //   console.log("Error: ",err);
  //   res.send("Something broke");
  // }

  const file = req.file;
  res.send({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
