import {useNavigate} from "react-router-dom";
import React from "react";

function Logout(){
    let navigate = useNavigate();

    function cleardata() {
        sessionStorage.clear();
        navigate("/staff");
    }

    return (
            <button className="button position-absolute top-0 end-0 m-4" onClick={() => {cleardata()}}>Log out</button>
    );
}

export default Logout

