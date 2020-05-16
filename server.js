const express = require('express')
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/",(req,res,err)=>{
    res.status(300);
    res.send('Hello !')
});

app.listen(port, () => {
    console.log('Server is up on port '+port);
});