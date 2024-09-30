import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "@mantine/core/styles.css";
// import Service from './ServiceConnection/ServiceConnection';

const App = () => {
    return (
        <div>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                {/* <Service /> */}
                <Router>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                    </Routes>
                </Router>
                <></>
            </MantineProvider>
        </div>
    );
};

export default App;
