import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
const formSubmission = (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/register/", {
            "username": username,
            "password": password
        })
            .then((res) => {
                console.log(res.data)
                setUsername("");
                setPassword("");
                alert("registration successfull")
                navigate("/login")
            })
        .catch((err)=>console.log(err))
}

    return (
        <>
        <form onSubmit={formSubmission}>
                <input type="text" value={username} placeholder="enter your username" onChange={(e) => setUsername(e.target.value)} /><br/>
                <input type="password" value={password} placeholder="enter your password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="register"/>
        </form>
        </>
    )
}

export default Register