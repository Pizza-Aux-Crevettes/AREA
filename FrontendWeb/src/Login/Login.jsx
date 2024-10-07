import { useState } from "react";
import "./Login.css";
import Cookies from "cookies-js";
import { Button, LoadingOverlay } from "@mantine/core";
import { resolvePath, useNavigate, useLocation } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notLogin, setNotLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    function CreationMsg() {
        if (notLogin === true) {
            return (
                <div className="errorMsg_div">
                    Email address or password incorrect
                </div>
            );
        } else {
            return <></>;
        }
    }

    function LoginUser() {
        setLoading(true);
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("pas ok ...");
                    setNotLogin(true);
                }
            })
            .then((json) => {
                Cookies.set("token", json.own_token);
                window.location.reload();
            })
            .then(() => {});
    }

    return (
        <div className="login-main-div">
            <div className="login_div">
                <LoadingOverlay
                    visible={loading}
                    overlayBlur={2}
                    className="loading"
                />
                <div className="login-first-container">
                    <h1>Login</h1>
                    <div className="email_input">
                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password_input">
                        <input
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <CreationMsg></CreationMsg>
                    <div>
                        <div className="button-login">
                            <Button size="xl" onClick={LoginUser}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="login-second-container">
                    <div className="sign_in">
                        <p>New here?</p>
                        <a href="http://localhost:5173/Register">Register</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
