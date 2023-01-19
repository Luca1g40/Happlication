import React from 'react';

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Notifications() {

    let tafelId = 6;

    function tableHelp() {
        axios.put(`http://localhost:8080/happ/table/${tafelId}/helpNodig`, {
            "setHulpBool": "true"
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const notify = () => toast(`U wordt zo snel mogelijk geholpen door een van onze Obers!`);

    return (
        <>
            <button onClick={ () => { tableHelp(); notify(); } } className={"button"}>

                Call Ober!
            </button>
            <ToastContainer/>
        </>
    );
}

export default Notifications;