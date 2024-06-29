import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Consistent import name
import { useNavigate } from 'react-router-dom';
import './AddFoodForm.css'

const AddFoodForm = () => {
  const [formData, setFormData] = useState({
    foodName: '',
    pricePerKilo: '',
    unitsInKilos: '',
    region: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/food/foods', formData)
      .then(response => {
        console.log('Food item created:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Food item created successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        setFormData({
          foodName: '',
          pricePerKilo: '',
          unitsInKilos: '',
          region: '',
          phoneNumber: '',
        });
      })
      .catch(error => {
        console.error('Error creating food item:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to create food item',
          text: error.message || 'An error occurred.',
        });
      });
  };

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
    <div className="add-food-container">
      <h2>Add Food Item</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="foodName">Food Name</label>
        <input type="text" id="foodName" name="foodName" value={formData.foodName} onChange={handleInputChange} required />

        <label htmlFor="pricePerKilo">Price per Kilo</label>
        <input type="number" id="pricePerKilo" name="pricePerKilo" value={formData.pricePerKilo} onChange={handleInputChange} required />

        <label htmlFor="unitsInKilos">Units in Kilos</label>
        <input type="number" id="unitsInKilos" name="unitsInKilos" value={formData.unitsInKilos} onChange={handleInputChange} required />

        <label htmlFor="region">Region</label>
        <input type="text" id="region" name="region" value={formData.region} onChange={handleInputChange} required />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />

        <button type="submit">Add Food</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AddFoodForm;
