import { useState } from "react";
import "./SignUp.css"

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('')

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
            <div className="create_account">
                <p>Create an</p>
                <a href="https://www.codeur.com">account</a>
            </div>
        </div>
    )
}

export default SignUp;
