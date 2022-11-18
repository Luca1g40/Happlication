import React from "react";
import "../styles/Errors.css"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function Error403Page() {
    const navigate = useNavigate();

    return (
        <>
            <div className="container2">
                <div className={"error-title"}>403</div>
                <div className={"error-subtitle"}>Ho! Jammer...</div>
                <div>De pagina die u probeert te bereiken heeft beperkte toegang.</div>
                <div>Login of ga terug naar de vorige pagina.</div>
                <div className={"error-login"}>
                    <button className="button" onClick={() => navigate(-2)}>Terug</button>
                    <Link className="button error-login-button" to="/staff">Login</Link>
                </div>
            </div>
        </>
    );
}