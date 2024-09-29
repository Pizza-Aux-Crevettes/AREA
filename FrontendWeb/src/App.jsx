import { useState } from "react";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </Router>
            <></>
        </div>
    );
};

export default App;
