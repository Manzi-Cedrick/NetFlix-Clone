import "./App.css";

import {BrowserRouter, Routes,Route} from 'react-router-dom';
import HomePage from "./HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/home" element={<HomePage/>}/>
    <Route path="/signup" element={<SignUp />}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
