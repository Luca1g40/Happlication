import React, {useEffect, useState} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Notifications(){

    let tafelId = 577;

    function tableHelp(){
        axios.put(`http://localhost:8080/happ/table/${tafelId}/helpNodig`, {//todo->tafelId moet zelf opgehaald worden
            "setHulpBool" : "true"
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
            <button  onClick={() => { tableHelp(); notify();}} className="button position-absolute bottom-0 end-0 m-4">Call Ober!</button>
            <ToastContainer />
        </>
    );
}

export default Notifications;