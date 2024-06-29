// src/components/AllFoods.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllFoods = () => {
  const [foods, setFoods] = useState([]);

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
        // After deleting, fetch the updated list of foods
        fetchFoods();
      })
      .catch(error => {
        console.error('Error deleting food item:', error);
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllFoods;
