const mongoose = require('mongoose');
mongoose.connect(process.env.mongo_url)

const db = mongoose.connection;
// hve to chck 2methods 1scnerio  db.on 1st parameter will b normal scnerio weather cooncn succes or not

// happy path
db.on('connected',()=>{
    console.log("Mongo DB connection successfull")
})

db.on('error',()=>{
    console.log("Mongo DB connection failed")
})
