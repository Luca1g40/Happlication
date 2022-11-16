import {useNavigate} from "react-router-dom";
import React from "react";

function Logout(){
    let navigate = useNavigate();

    function cleardata() {
        sessionStorage.clear();
        navigate("/staff");
    }

    return (
            <button className="button logout-button" onClick={() => {cleardata()}}>Log out</button>
    );
}

export default Logout

