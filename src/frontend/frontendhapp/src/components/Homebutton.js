import {useNavigate} from "react-router-dom";
import React from "react";

function HomeNav(){
    let navigate = useNavigate();

    function navHome(){
        navigate("/administration");
    }

    return (
        <button className="button position-absolute top-0 front-0 m-4" onClick={() => {navHome()}}>Home</button>
    );
}

export default HomeNav

