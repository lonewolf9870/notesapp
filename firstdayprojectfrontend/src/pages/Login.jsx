import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const formSubmission = (e) => {
        e.preventDefault();

        api.post("/login/", {
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