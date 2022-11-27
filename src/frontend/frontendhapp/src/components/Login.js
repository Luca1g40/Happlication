import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import {getRoles, loginRequest} from "../urlMappings/Login";

function Login() {
    let navigate = useNavigate();

    const [password, setPassword] = useState("")

    const handleClick = (value) => {
        console.log(value)
        if (value === "clear") {
            setPassword("")

        } else {
            setPassword(password + value)

        }
    }

     async function login() {
         const status = await loginRequest(password).then(res=>{console.log(res)})
         console.log(typeof status,typeof 200)
         if (status === 200) {
             getRoles()
             navigate("/staffmodule");
         }
     }

    return (
        <>
            <div>
                <h1>MEDEWERKER MODULE</h1>
                <div className={"loginDiv"}>
                    <div className={"labelDiv"}>
                        <input className={"inputField"} type={"password"} value={password} placeholder={"password"}/>
                    </div>
                    <div className={"staffGrid"}>

                        <div className="login-grid-item" onClick={() => { handleClick(1)}}><p>1</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(2)}}><p>2</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(3)}}><p>3</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(4)}}><p>4</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(5)}}><p>5</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(6)}}><p>6</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(7)}}><p>7</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(8)}}><p>8</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick(9)}}><p>9</p></div>
                        <div className="login-grid-item" onClick={() => { handleClick("clear")}}><p>Clear</p></div>
                        <div className="login-grid-item bottom-item" onClick={() => { handleClick(0)}}><p>0</p></div>
                        <div className="login-grid-item" onClick={() => { login()}}><p>Login</p></div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default Login