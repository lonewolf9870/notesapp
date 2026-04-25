import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const formSubmission = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/login/", {
            username,
            password
        })
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            setUsername("");
            setPassword("");
            alert("login successful");
            navigate("/");
        })
        .catch((err) => {
            console.log(err);
            alert("invalid username or password");
        });
    };

    return (
        <form onSubmit={formSubmission}>
            <input type="text" value={username} placeholder="enter your username" onChange={(e) => setUsername(e.target.value)} /><br/>
            <input type="password" value={password} placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="login"/>
        </form>
    );
}

export default Login;