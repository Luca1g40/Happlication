import {useNavigate} from "react-router-dom";
import React from "react";

function HomeNav(){
    let navigate = useNavigate();

    function navHome(){
        navigate("/administration");
    }

    return (
        <button className="button login-button" onClick={() => {navHome()}}>Home</button>
    );
}

export default HomeNav

