import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './homeUser.css';

function Homescreen() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [originalFoods, setOriginalFoods] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/food/foods');
        setFoods(data);
        setOriginalFoods(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterFoods = useCallback(() => {
    let filteredFoods = originalFoods;

    if (searchKey) {
      filteredFoods = filteredFoods.filter(food =>
        food.foodName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (regionFilter !== 'all') {
      filteredFoods = filteredFoods.filter(food => food.region === regionFilter);
    }

    setFoods(filteredFoods);
  }, [searchKey, regionFilter, originalFoods]);

  useEffect(() => {
    filterFoods();
  }, [searchKey, regionFilter, filterFoods]);

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
    <div>
      <div className="container">
        <div className='search-bar'>
          <div className="row mt-5 bs">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Search food"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="balangoda">Balangoda</option>
                <option value="jaffna">Jaffna</option>
                <option value="vavuniya">Vavuniya</option>
                <option value="nuwaraeliya">Nuwara Eliya</option>
                <option value="monaragala">Monaragala</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 food-list">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading food items.</div>
          ) : foods.length === 0 ? (
            <div>No food items found.</div>
          ) : (
            <div className="row">
              {foods.map(food => (
                <div className="col-md-4" key={food._id}>
                  <div className="food-card">
                    <h3>{food.foodName}</h3>
                    <p>Price: ${food.pricePerKilo} per kilo</p>
                    <p>Units: {food.unitsInKilos} kilos</p>
                    <p>Region: {food.region}</p>
                    <p>Contact: {food.phoneNumber}</p>
                    {/* Add delete button here if needed */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Homescreen;
