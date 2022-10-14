import { browserHistory } from 'react-router'
import "../styles/HomePageStaff.css"
import React, {useState} from "react";
import axios from "axios";


export default function Staff(){
    const [password, setPassword] = useState("")

    const handleClick = (value) => {
        console.log(value)
        if (value === "clear"){
            setPassword("")

        } else {
            setPassword(password + value)

        }

    }
    
    const login = () => {
        axios.post(`http://localhost:8080/authenticate`,{
            "username" : 391,
            "password" : password

        })
            .then(res => {
                sessionStorage.setItem("Authorization", "Bearer " + res.data.jwt)
                sessionStorage.setItem("name", parseJwt(res.data.jwt).sub)

                axios.get()

            })
        .catch(err => {
            console.log(err)
        })
    }

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }



    return(
        <>
            <div className={"homeStaffContainer"}>
                <h1>MEDEWERKER MODULE</h1>
                <div className={"loginDiv"}>
                    <div className={"labelDiv"}>
                        <input className={"inputField"} type={"password"} value={password} placeholder={"password"}/>
                    </div>
                    <div className={"staffGrid"}>

                        <div className="login-grid-item" onClick={() => {handleClick(1)}}><p>1</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(2)}}><p>2</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(3)}}><p>3</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(4)}}><p>4</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(5)}}><p>5</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(6)}}><p>6</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(7)}}><p>7</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(8)}}><p>8</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick(9)}}><p>9</p></div>
                        <div className="login-grid-item" onClick={() => {handleClick("clear")}}><p>Clear</p></div>
                        <div className="login-grid-item bottom-item"  onClick={() => {handleClick(0)}}><p>0</p></div>
                        <div className="login-grid-item" onClick={() => {login()}}><p>Login</p></div>

                    </div>
                </div>
            </div>
        </>
    )
}