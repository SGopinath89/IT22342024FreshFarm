require('dotenv').config()

const cookieParser = require('cookie-parser');


const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Import the cors middleware
const UserRoutes = require('./routes/User')
const FoodRoutes = require('./routes/foodroute')






// express app
const app = express()

// middleware
app.use(express.json())

app.use(cors()); // Enable CORS middleware

app.use(cookieParser())



app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/auth',UserRoutes);
app.use('/food',FoodRoutes);



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })
  
