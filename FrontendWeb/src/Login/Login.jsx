import { useEffect, useState } from 'react';
import './Login.css';
import Cookies from 'cookies-js';
import { Button, LoadingOverlay } from '@mantine/core';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notLogin, setNotLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const services = [
        'spotify_token',
        'google_token',
        'twitch_token',
        'discord_token',
        'github_token',
        'spotify_refresh',
        'google_refresh',
        'twitch_refresh',
        'discord_refresh',
    ];
    let apiUrl = localStorage.getItem('userInputIP') ? localStorage.getItem('userInputIP') : 'http://localhost:8080';

    function changeUrl() {
        const userInput = window.prompt(
            'Please enter an IP address :',
            'http://localhost:8080'
        );
        if (userInput) {
            localStorage.setItem('userInputIP', userInput);
            apiUrl = localStorage.getItem('userInputIP')
        }
    }

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

    async function LoginUser() {
        setLoading(true);
        const resultLogin = await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        setLoading(false);

        if (resultLogin.ok) {
            const json = await resultLogin.json();
            Cookies.set('token', json.own_token);
            const resultToken = await fetch(`${apiUrl}/api/getToken`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer${apiUrl} ${Cookies.get('token')}`,
                },
                body: JSON.stringify({
                    user_email: email,
                }),
            });
            const data = await resultToken.json();
            for (let i = 0; i < services.length; i++) {
                if (data[0][`${services[i]}`] !== null) {
                    localStorage.setItem(services[i], true);
                } else {
                    localStorage.setItem(services[i], false);
                }
            }
            window.location.reload();
        } else {
            setNotLogin(true);
        }
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
                            <Button size="md" onClick={changeUrl}>
                                Change api url
                            </Button>
                            <Button size="md" onClick={LoginUser}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="login-second-container">
                    <div className="sign_in">
                        <p>New here?</p>
                        <a href="http://localhost:8081/Register">Register</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

            export default Login;
