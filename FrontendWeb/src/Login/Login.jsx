import { useState } from "react";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            <div className="forgot_password">
                <a href="https://www.amoursucre.com/s1/city">
                    forgot your password?
                </a>
            </div>
            <div className="sign_in">
                <p>New here?</p>
                <a href="http://localhost:5173/">Sign up</a>
            </div>
        </div>
    );
}

export default Login;
