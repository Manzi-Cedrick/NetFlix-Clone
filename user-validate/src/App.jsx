import "./App.css";

import {BrowserRouter, Routes,Route} from 'react-router-dom';
import HomePage from "./HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import NotFound from "./components/NotFound";
import Update from "./components/Update";
import Profile from "./components/Profile";
import Checkout from "./components/Checkout";
import Product from "./components/Product";
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/signup" element={<SignUp />}/>
    <Route path="/update" element={<Update />}/>
    <Route path='/profile' element={<Profile /> }/>
    <Route path='profile/checkout' element={<Checkout/>}/>
    <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
