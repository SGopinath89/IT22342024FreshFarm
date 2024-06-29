import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './homeAdmin.css'

function HomeAdmin() {

  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('/auth/logout')
      .then(res => {
        if (res.data.status) {
          Swal.fire({
            title: 'Logged out successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/');
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Logout failed',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'Error during logout',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.log('Error during logout:', err);
      });
  };


  return (
    <div >
      <ul>
            <li><Link to="/add">Add Food Item</Link></li>
            <li><Link to="/all">View All Food Items</Link></li>
          </ul>
          <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomeAdmin;
