import React, { useState } from "react";
import api from "../api";
import { useNavigate } from 'react-router-dom'
function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
const formSubmission = (e) => {
        e.preventDefault();

        api.post("/register/", {
            "username": username,
            "password": password
        })
            .then((res) => {
                console.log(res.data)
                setUsername("");
                setPassword("");
                alert(res.data.message)
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