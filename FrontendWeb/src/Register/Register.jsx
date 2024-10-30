import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, LoadingOverlay } from '@mantine/core';
import './Register.css';
import Cookies from 'cookies-js';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [alreadyUse, setAlreadyUse] = useState('');
    const [accountCreated, setAccountCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const apiUrl = localStorage.getItem('userInputIP');

    useEffect(() => {
        if (!localStorage.getItem('userInputIP')) {
            const userInput = window.prompt(
                'Please enter an IP address :',
                'http://localhost:8080'
            );
            if (userInput) {
                localStorage.setItem('userInputIP', userInput);
            } else {
                localStorage.setItem('userInputIP', 'http://localhost:8080');
            }
        }
    }, []);

    function goToLogin() {
        navigate('/');
        location.pathname === '/';
    }

    function CreationMsg({ correctMsg }) {
        if (alreadyUse !== '') {
            return <div className="errorMsg_div">{alreadyUse} </div>;
        } else if (accountCreated) {
            setTimeout(goToLogin, 3000);
            return <div className="correctMsg_div">{correctMsg}</div>;
        } else {
            return <></>;
        }
    }

    function registerDatas() {
        setAlreadyUse('');
        setLoading(true);
        if (
            email !== '' &&
            password !== '' &&
            name !== '' &&
            surname !== '' &&
            username !== ''
        ) {
            fetch(`${apiUrl}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                        fetch(`${apiUrl}/api/setNewUSer`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                userEmail: email,
                            }),
                        }).then(() => {});
                        setAccountCreated(true);
                    } else {
                        setAlreadyUse(
                            'Username or email already use, please change and retry'
                        );
                    }
                })
                .then(() => {});
        } else {
            setTimeout(() => {
                setLoading(false);
                setAlreadyUse('Please enter your information.');
            }, 300);
        }
    }

    return (
        <div className="main_div">
            <div className="register_div">
                <LoadingOverlay
                    visible={loading}
                    overlayBlur={2}
                    className="loading"
                />
                <b style={{ fontSize: '8vh', color: 'white' }}>Register</b>
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
                <CreationMsg
                    correctMsg={
                        'Your account has been created. You will be redirected to login'
                    }
                />
                <div className="button-create">
                    <Button size="xl" onClick={registerDatas}>
                        Create account
                    </Button>
                </div>
                <div className="login">
                    <p>Already have an account ? </p>
                    <a href="http://localhost:8081/">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
