import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link, useNavigate} from "react-router-dom";


export default function StaffModuleHomePagina() {
    return (
        <>
            <div className="staffModuleHomePagina_container">
                <h1>Staff Module Home Pagina</h1>
                <div className="container2">
                    <Link className="button homeModule_bt_space" to="/">Home</Link>
                    <Link className="button homeModule_bt_space" to="/orders">Keuken</Link>
                    <Link className="button homeModule_bt_space" to="/orders">Bar</Link>
                    <Link className="button homeModule_bt_space" to="">Voorraad Beheer</Link>



                </div>
            </div>
        </>
    );
}