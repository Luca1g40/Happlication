import {CreateTable} from "../../urlMappings/TableRequests";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import { ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function CreatingTable() {
    let navigate = useNavigate();
    const [num] = useState('');

    async function create(){
        const number = document.getElementById("n").value;
        const amount = document.getElementById("a").value;

        const status = await CreateTable(number, amount)
        if (status === 200) {
            navigate("/AllTables");
        } else if (status === 400){
            toast(`Voer een geldig taffelnummer en aantal zitplaatsen in`);
        }
    }

    return (
        <form className={"list"}>
            <h4>Tafel nummer</h4>
            <input type="text" placeholder="Voer een tafel nummer in" id="n"/><br/><br/>
            <h4>Aantal personen</h4>
            <input type="text" placeholder="voer het aantal personen in" id="a"/><br/><br/>
            <input type="button" value="Tafel aanmaken" onClick={() => {create()}} className={"button"}/>
            <ToastContainer />
        </form>
    )

}

export default CreatingTable