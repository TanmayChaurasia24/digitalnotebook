import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const { mode } = props;
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json);
            if (json.jwt_data) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.jwt_data);
                console.log("Token set in localStorage:", json.jwt_data);
                navigate("/home");
            } else {
                console.log("Login failed:", json.error || "Unknown error");
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Error occurred while logging in");
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='my-5'>
            <h1 className={`my-4 text-center text-${mode === 'dark' ? 'light' : 'dark'}`}>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className={`form-label text-${mode === 'dark' ? 'light' : 'dark'}`}>Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className={`form-text form-label text-${mode === 'dark' ? 'light' : 'dark'}`}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className={`form-label text-${mode === 'dark' ? 'light' : 'dark'}`}>Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>

    );
}

export default Login;