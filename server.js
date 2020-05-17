const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');

const port = process.env.PORT || 3000;
const app = express();

const trainRoutes = require('./backend/routes/trainRoutes');
const viewRoutes = require('./backend/routes/viewRoutes');

const socket = require('./backend/sockets/mainSocket');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use('/api/v1/train', trainRoutes);

app.use('', viewRoutes);

var server = app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

socket.socketBootstrap(server);