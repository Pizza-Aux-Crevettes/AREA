import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, LoadingOverlay } from '@mantine/core';
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
    const [loading, setLoading] = useState(false);

    function goToLogin() {
        navigate("/Login");
        location.pathname === "/Login";
    }

    function CreationMsg({ correctMsg }) {
        if (alreadyUse !== "") {
            return <div className="errorMsg_div">{alreadyUse} </div>;
        } else if (accountCreated) {
            setTimeout(goToLogin, 3000);
            return (
                <div className="correctMsg_div">
                    {correctMsg}
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
            setLoading(true);
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
                    setLoading(false);
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
                <LoadingOverlay visible={loading} overlayBlur={2} className="loading"/>
                <b style={{fontSize: '8vh', color:'black'}}>Register</b>
                <div className="global-input">
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="global-input">
                    <input
                        placeholder="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div className="global-input">
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="global-input">
                    <input
                        placeholder="Email"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="global-input">
                    <input
                        placeholder="Password"
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <CreationMsg correctMsg={"Your account has been created. You will be redirected to login"} />
                <div className="button-create">
                    <Button size='xl' onClick={registerDatas}>
                        Create account
                    </Button>
                </div>
                <div className="login">
                    <p>Already have an account ? </p>
                    <a href="http://localhost:5173/Login">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
