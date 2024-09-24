import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    function registerDatas() {
        if (
            email !== null &&
            password !== null &&
            name !== null &&
            surname !== null &&
            username !== null
        ) {
            fetch("http://localhost:3000/api/setUsers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    name,
                    surname,
                    username,
                    password,
                }),
            })
                .then((response) => {})
                .catch((error) => console.error(error));
            navigate("/Login");
            location.pathname === "/Login";
        } else {
            return;
        }
    }

    return (
        <div className="signup_div">
            <h1>Sign up</h1>
            <div className="name_input">
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="surname_input">
                <input
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <div className="username_input">
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="email_input">
                <input
                    placeholder="Email"
                    value={email}
                    type="email"
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
            <div>
                <button className="button_create" onClick={registerDatas}>
                    Create account
                </button>
            </div>
            <div className="login">
                <p>Already have an account ? </p>
                <a href="http://localhost:5173/Login">Sign up</a>
            </div>
        </div>
    );
}

export default SignUp;
