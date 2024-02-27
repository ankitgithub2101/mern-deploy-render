const express = require("express");
const cors = require("cors");
const app = express();

require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;
const path = require("path")


// 3rd party middleware
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
app.use('/api/users', usersRoute);

// static files
app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
app.listen(port, () => console.log(`Node server Listening on port ${port}`));
