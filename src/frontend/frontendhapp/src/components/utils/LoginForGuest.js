import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {GetTableByNumber, setTimeAndStatus} from "../../urlMappings/TableRequests";

function LoginForGuest() {
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
        const status = await GetTableByNumber(password)
        const newDate = new Date()
        const LocalTime = `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`
        if (status !== 0) {
            setTimeAndStatus(status, LocalTime)
            sessionStorage.setItem("tafelid", status)
            navigate("/home")
        } else {
            toast(`Wachtwoord is onjuist!`);
        }
    }

    return (
        <>
            <h1>Login Tafel</h1>
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
                        login();
                    }}><p className={"digit"}>Login</p></div>
                    <ToastContainer/>
                </div>
            </div>
        </>
    )

}

export default LoginForGuest