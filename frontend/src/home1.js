import React from 'react';
 import { Link } from 'react-router-dom';



function Home1() {
  return (
    <div >
       <div>
        <Link to="/Signin" className="BD-button">SignIn</Link>
       </div> 
       <div>
       <Link to="/SignUp" className="BD-button">SignUp</Link>
       </div> 
    </div>
  );
}

export default Home1;
