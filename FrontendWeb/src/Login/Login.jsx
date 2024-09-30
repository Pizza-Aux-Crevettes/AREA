import { useState } from "react";
import "./Login.css";
import { resolvePath } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function LoginUser() {
        fetch("http://localhost:3000/api/getUsers", {
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
                if (response.ok) {
                    console.log("tu es connecté !");
                } else {
                    console.log("pas ok ...");
                }
            })
            .then(() => {});
    }

    return (
        <div className="login_div">
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
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button className="button_create" onClick={LoginUser}>
                    Login
                </button>
            </div>
            <div className="forgot_password">
                <a href="https://www.amoursucre.com/s1/city">
                    forgot your password?
                </a>
            </div>
            <div className="sign_in">
                <p>New here?</p>
                <a href="http://localhost:5173/">Register</a>
            </div>
        </div>
    );
}

export default Login;
