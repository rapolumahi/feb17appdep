
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import TopNavigation from './components/TopNavigation';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}  >  </Route>
     <Route   path='/signup' element={<Signup/>} > </Route> 
     <Route path='/home' element={<Home/>} ></Route>
     <Route path='/topnavigation' element={<TopNavigation/>}  ></Route>
      <Route path='/editprofile' element={<EditProfile/>}></Route>
  
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
