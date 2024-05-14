const { name } = require("ejs");
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect.then(() => {
    console.log("connected sucessfully");
})
.catch(() =>{
    console.log("can't connect ");
})

const loginschema=new mongoose.Schema({
    name:{
        type : String ,
        required :true
    },
    password:{
        type : String ,
        required :true
    }
})

const collection = new mongoose.model("farmers",loginschema);
module.exports=collection;