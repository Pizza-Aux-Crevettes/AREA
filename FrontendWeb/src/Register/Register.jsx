import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Register.css";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [alreadyUse, setAlreadyUse] = useState("");
    const [accountCreated, setAccountCreated] = useState(false);

    function goToLogin() {
        navigate("/Login");
        location.pathname === "/Login";
    }

    function CreationMsg({ correctMsg }) {
        if (alreadyUse !== "") {
            return <div className="errorMsg_div">{alreadyUse} </div>;
        } else if (accountCreated) {
            return (
                <div className="correctMsg_div">
                    {" "}
                    {correctMsg}
                    <button className="ok_button" onClick={goToLogin}>
                        Ok
                    </button>
                </div>
            );
        } else {
            return <></>;
        }
    }

    function registerDatas() {
        setAlreadyUse("");
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
                .then((response) => {
                    if (response.ok) {
                        setAccountCreated(true);
                    } else {
                        setAlreadyUse(
                            "Username or email is already use, please change and retry"
                        );
                    }
                })
                .then(() => {});
        }
    }

    return (
        <div className="main_div">
            <div className="register_div">
                <h1>Register</h1>
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
                    <a href="http://localhost:5173/Login">Login</a>
                </div>
            </div>
            <CreationMsg
                correctMsg={"Your account has been created. Please login"}
            ></CreationMsg>
        </div>
    );
}

export default Register;
