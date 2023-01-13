import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {getRoles, loginRequest} from "../../urlMappings/Login";

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
        const status = await loginRequest(password)
            .then(res => {
                console.log(res)
                return res
            })

        if (status === 200) {
            getRoles().then(res => {
                console.log(res)
                if (res.includes("KITCHEN_RIGHTS") || res.includes("BAR_RIGHTS") || res.includes("KITCHEN_RIGHTS") && res.includes("BAR_RIGHTS")) {
                    navigate("/orders")
                } else if (res.includes("ADMINISTRATION_RIGHTS")) {
                    navigate("/administration")
                } else if (res.includes("SERVICE_RIGHTS")) {
                    navigate("/staffDashboard")
                } else if (res.includes("ADMIN_RIGHTS")) {
                    navigate("/administration")
                }
            })
        }
    }

    return (
        <>
            <h1>MEDEWERKER MODULE</h1>
            <div className={"login-wrapper"}>
                <input className={"password-field"} type={"password"} value={password} disabled="disabled"
                       placeholder={"password"}/>
                <div className={"staff-grid"}>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(1)
                    }}><p className={"digit"}>1</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(2)
                    }}><p className={"digit"}>2</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(3)
                    }}><p className={"digit"}>3</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(4)
                    }}><p className={"digit"}>4</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(5)
                    }}><p className={"digit"}>5</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(6)
                    }}><p className={"digit"}>6</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(7)
                    }}><p className={"digit"}>7</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(8)
                    }}><p className={"digit"}>8</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick(9)
                    }}><p className={"digit"}>9</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        handleClick("clear")
                    }}><p className={"digit"}>Clear</p></div>
                    <div className="login-grid-item button bottom-item" onClick={() => {
                        handleClick(0)
                    }}><p className={"digit"}>0</p></div>
                    <div className="login-grid-item button" onClick={() => {
                        login()
                    }}><p className={"digit"}>Login</p></div>

                </div>
            </div>
        </>
    )

}

export default Login