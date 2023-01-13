import {useNavigate} from "react-router-dom";
import React from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createArea} from "../../urlMappings/AreaRequests";

function CreatingArea() {
    let navigate = useNavigate();

    async function create() {
        const name = document.getElementById("m").value;

        if (name === "") {
            toast("u heeft geen naam ingevuld!")

        } else {
            const status = await createArea(name);
            if (status === 200) {
                navigate("/areas");
            }
        }
    }

    return (
        <form className={"list"}>
            <h4>Naam</h4>
            <input type="text" placeholder="Voer naam in" id="m"/><br/><br/>
            <input type="button" value="Area aanmaken" onClick={() => {
                create()
            }} className={"button"}/>
            <ToastContainer/>
        </form>
    )
}

export default CreatingArea