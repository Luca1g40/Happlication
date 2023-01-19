import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {KlantHeeftHulpNodig} from "../../urlMappings/TableRequests";

function Notifications(){
    const tableid = sessionStorage.getItem("tafelid")

    const notify = () => toast(`U wordt zo snel mogelijk geholpen door een van onze Obers!`);

    return (
        <>
            <button  onClick={() => { KlantHeeftHulpNodig(tableid); notify();}} className="button call-ober-knop">Call Ober!</button>
            <ToastContainer />
        </>
    );
}

export default Notifications;