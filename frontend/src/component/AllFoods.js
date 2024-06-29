import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AllFoods.css'

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [formData, setFormData] = useState({
    pricePerKilo: '',
    unitsInKilos: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = () => {
    axios.get('/food/foods')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('Error fetching food items:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/food/foods/${id}`)
      .then(response => {
        console.log('Food item deleted:', response.data);
        fetchFoods();
      })
      .catch(error => {
        console.error('Error deleting food item:', error);
      });
  };

  const handleEditClick = (food) => {
    setEditingFoodId(food._id);
    setFormData({
      pricePerKilo: food.pricePerKilo,
      unitsInKilos: food.unitsInKilos
    });
  };

  const handleUpdate = (id) => {
    axios.put(`/food/foods/${id}`, {
      pricePerKilo: formData.pricePerKilo,
      unitsInKilos: formData.unitsInKilos
    })
      .then(response => {
        console.log('Food item updated:', response.data);
        fetchFoods();
        setEditingFoodId(null);
      })
      .catch(error => {
        console.error('Error updating food item:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
    <div className="all-foods-container">
      <h2>All Food Items</h2>
      <ul>
        {foods.map(food => (
          <li key={food._id}>
            <strong>{food.foodName}</strong> - ${food.pricePerKilo} per kilo ({food.unitsInKilos} kilos) | Region: {food.region} | Contact: {food.phoneNumber}
            <button onClick={() => handleDelete(food._id)}>Delete</button>
            <button onClick={() => handleEditClick(food)}>Edit</button>
            {editingFoodId === food._id && (
              <div>
                <label
                  htmlFor="pricePerKilo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price per Kilo
                </label>
                <input
                  type="text"
                  name="pricePerKilo"
                  value={formData.pricePerKilo}
                  onChange={handleChange}
                  placeholder="Price per Kilo"
                />
                <label
                  htmlFor="unitsInKilos"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Units in Kilos
                </label>
                <input
                  type="text"
                  name="unitsInKilos"
                  value={formData.unitsInKilos}
                  onChange={handleChange}
                  placeholder="Units in Kilos"
                />
                <button onClick={() => handleUpdate(food._id)}>Update</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AllFoods;
