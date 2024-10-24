import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Service from "./ServiceConnection/ServiceConnection";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "@mantine/core/styles.css";
import Cookies from "cookies-js";

const App = () => {
    const [adaptability, setAdaptability] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetch('http://localhost:8080/api/getAdaptabilityUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                return response.json();
            }).then ((json) => {
                setAdaptability(json[0].adaptabilityText);
            })
            .catch((error) => {
                console.error("Erreur lors de la requête GET:", error);
            });
        }
    }, []);

    return (
        <div>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{
                fontFamily: adaptability ? 'OpenDyslexic, Arial, sans-serif' : 'Arial, sans-serif',
            }}>
                <Router>
                    <Routes>
                        {Cookies.get("token") ? (
                            <>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/service" element={<Service />} />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<Login />} />
                                <Route
                                    path="/register"
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
