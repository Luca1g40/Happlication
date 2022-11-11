import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";


export default function StaffModuleHomePagina() {
    return (
        <>
            <div className="staffModuleHomePagina_container">
                <h1></h1>
                <div className="container2">
                    <Link className="button homeModule_bt_space" to="/">Home</Link>
                    <Link className="button homeModule_bt_space" to="/orders">Keuken</Link>
                    <Link className="button homeModule_bt_space" to="/orders">Bar</Link>
                    <Link className="button homeModule_bt_space" to="/administration">Voorraad Beheer</Link>
                    <Link className="button position-absolute bottom-0 end-0 m-4" to="/staff">Log out</Link>



                </div>
            </div>
        </>
    );
}