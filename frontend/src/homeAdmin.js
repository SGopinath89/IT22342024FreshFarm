import React from 'react';
import { Link } from 'react-router-dom';

function HomeAdmin() {
  return (
    <div >
      <ul>
            <li><Link to="/add">Add Food Item</Link></li>
            <li><Link to="/all">View All Food Items</Link></li>
          </ul>
    </div>
  );
}

export default HomeAdmin;
