import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Login from "./Login/Login";
import Signup from "./SignUp/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </Router>
            <></>
        </div>
    );
};

export default App;
