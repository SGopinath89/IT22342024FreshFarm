const express = require("express");
const path = require("path");
const collection = require("./config"); // Ensure this file exists and is properly configured
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../style')));
app.use(express.urlencoded({ extended: false }));

// Use EJS as the view engine
app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");

app.get("/FarmerLogin", (req, res) => {
    res.render("FarmerLogin");
});

app.get("/FarmerSignup", (req, res) => {
    res.render("FarmerSignup");
});

// Register User
app.post("/FarmerSignup", async (req, res) => {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await collection.findOne({ name: username });

    if (existingUser) {
        return res.send('User already exists. Please choose a different username.');
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user data with hashed password
    const data = {
        name: username,
        password: hashedPassword
    };
    const userdata = await collection.insertOne(data);
    console.log(userdata);

    res.send('User registered successfully.');
});

// Login User 
app.post("/FarmerLogin", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.username });
        if (!user) {
            return res.send("User not found");
        }

        // Check if the passwords match
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.send("Wrong password");
        }

        // Passwords match, render the home page
        res.render("Home");
    } catch (error) {
        console.error(error);
        res.send("An error occurred");
    }
});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
