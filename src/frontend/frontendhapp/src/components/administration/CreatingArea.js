import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createArea} from "../../urlMappings/AreaRequests";

function CreatingArea(){
    let navigate = useNavigate();




    async function create(){
        const name = document.getElementById("m").value;

        if (name === "") {
            toast("u heeft geen naam ingevuld!")

        }else {
            const status = await createArea(name);
            if (status === 200){
                navigate("/areas");
            }
        }
    }

    return (
        <>
            <form className={"list"}>
                <label>Naam van Area: </label>
                <input type="text" id="m"/><br/><br/>
                <input type="button" value="Area aanmaken"  onClick={() => {create()}} className={"button"}/>
                <ToastContainer />
            </form>


        </>
    )
}

export default CreatingArea