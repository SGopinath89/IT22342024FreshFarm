
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home1 from './home1';
import Home2 from './homeAdmin';
import Home3 from './homeUser';
import Signin from './Signin';
import SignUp from './SignUp';
import AddFoodForm from './component/AddFoodForm';
import AllFoods from './component/AllFoods';

function App() {
  return (  
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home1 />} />
          <Route path="/HomeAdmin" element={<Home2 />} />
          <Route path="/HomeUser" element={<Home3 />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/add" element={<AddFoodForm />} />
          <Route path="/all" element={<AllFoods />} />
       </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
