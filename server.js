const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const port = process.env.PORT || 3000;
const app = express();

const trainRoutes = require('./backend/routes/trainRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('./public'));

app.use('/api/train',trainRoutes);

app.get("/",(req,res)=>{
  res.sendFile(__dirname + '/index.html');
})

var server = app.listen(port, () => {
    console.log('Server is up on port '+port);
});
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  console.log('a user connected');
});