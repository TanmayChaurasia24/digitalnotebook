import { useState } from 'react';
import React from "react";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "",cpassword: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {name,email,password} = credentials
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name,email,password })
            });
            const json = await response.json();
            console.log(json);
            if (json.jwt_data) {
                // Save the auth token and redirect
                localStorage.setItem('token', json.jwt_data);
                console.log("Token set in localStorage:", json.jwt_data);
                navigate("/");
            }
        } catch (error) {
            console.error("signup error:", error);
            alert("Error occurred while signning up");
        }
    }
    

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlfor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name='name'
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlfor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />

                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name='password'
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlfor="cpassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="cpassword"
                        name='confirm password'
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
