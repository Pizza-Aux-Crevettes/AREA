import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "@mantine/core/styles.css";
import Cookies from "cookies-js";

const App = () => {
    return (
        <div>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <Router>
                    <Routes>
                        {Cookies.get("token") ? (
                            <>
                                <Route path="/" element={<Dashboard />} />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<Login />} />
                                <Route
                                    path="/Register"
                                    element={<Register />}
                                />
                            </>
                        )}
                    </Routes>
                </Router>
                <></>
            </MantineProvider>
        </div>
    );
};

export default App;
