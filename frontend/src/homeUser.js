import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homeuser.css';


function Homescreen() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [originalFoods, setOriginalFoods] = useState([]);

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

  const filterBySearch = () => {
    const filteredFoods = originalFoods.filter(food =>
      food.foodName.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFoods(filteredFoods);
  };

  const filterByRegion = (e) => {
    setRegionFilter(e.target.value);
    if (e.target.value === 'all') {
      setFoods(originalFoods);
    } else {
      const filteredFoods = originalFoods.filter(food => food.region === e.target.value);
      setFoods(filteredFoods);
    }
  };

  return (
    <div>
      
      <div className="container">
        <div className='row mt-5 bs'>
          <div className='col-md-5'>
            <input
              type='text'
              className='form-control'
              placeholder='Search food'
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              onKeyUp={filterBySearch}
            />
          </div>
          <div className="col-md-4">
            <select value={regionFilter} onChange={filterByRegion}>
              <option value='all'>All Regions</option>
              <option value='balangoda'>balangoda</option>
              <option value='Region2'>Region 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            foods.length === 0 ? (
              <div>No food items found.</div>
            ) : (
              foods.map(food => (
                <div className="food-card" key={food._id}>
                  <h3>{food.foodName}</h3>
                  <p>Price: ${food.pricePerKilo} per kilo</p>
                  <p>Units: {food.unitsInKilos} kilos</p>
                  <p>Region: {food.region}</p>
                  <p>Contact: {food.phoneNumber}</p>
                  {/* Add delete button here if needed */}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Homescreen;
