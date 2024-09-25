import { MantineProvider } from '@mantine/core';
import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Login from "./Login/Login";
import Signup from "./SignUp/SignUp";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import '@mantine/core/styles.css';
// import Service from './ServiceConnection/ServiceConnection';

const App = () => {
    return (
        <div>
            {/* <MantineProvider withGlobalStyles withNormalizeCSS>
                <Service/>
            </MantineProvider> */}
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
