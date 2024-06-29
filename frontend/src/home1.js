import React from 'react';
import { Link } from 'react-router-dom';
import './home1.css'; // Import the CSS file

function Home1() {
  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to FreshFarmfood Selling Platform</h1>
      <div className="button-container">
        <Link to="/Signin" className="BD-button">SignIn</Link>
        <Link to="/SignUp" className="BD-button">SignUp</Link>
      </div>
    </div>
  );
}

export default Home1;
