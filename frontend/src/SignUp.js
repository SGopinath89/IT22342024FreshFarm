import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [Username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: Username,
          email,
          password,
          mobilenumber,
          role
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.status) {
        alert("You have successfully registered!")
        navigate('/Signin');
      } else {
        alert("You have already registered")
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  return (
    <div>
      <div className="signup-form">
        <form onSubmit={handleSignup}>
          <h5>Sign Up</h5>
          <div>
            <label htmlFor="Username">Username</label>
            <input
              type="text"
              name="Username"
              id="email"
              placeholder="name@company.com"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="mobilenumber">Mobile Number</label>
            <input
              type="text"
              name="mobilenumber"
              id="password"
              placeholder="••••••••"
              required
              onChange={(e) => setMobilenumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Customer</option>
              <option value="admin">Farmer</option>
            </select>
          </div>
          <button type="submit">Sign Up Proceed</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have an account ?{" "}
            <a href="/Signin" className="signup-link">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
