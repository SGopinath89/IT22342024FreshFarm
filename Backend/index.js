const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

app.set('view engine','ejs');

app.use(express.static,("public"));

app.get("/",(req,res) => {
      res.render("login");      
    });

app.get("/",(req,res) => {
        res.render("login");      
      });
const port=5000;
app.listen(port,  () =>{
    console.log("server running on port : ${port} ");
})