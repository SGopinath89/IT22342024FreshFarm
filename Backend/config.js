const { name } = require("ejs");
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://rash:12345@cluster0.25gh5ty.mongodb.net/login-tut");

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