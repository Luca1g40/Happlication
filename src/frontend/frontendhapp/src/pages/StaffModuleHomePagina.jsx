import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";
import Logout from "../components/utils/Logout"


export default function StaffModuleHomePagina() {
    return (
        <>
            <h1>Staff module</h1>
            <div className="administration-grid">
                <Link className="button homeModule_bt_space" to="/">Home</Link>
                <Link className="button homeModule_bt_space" to="/orders">Keuken</Link>
                <Link className="button homeModule_bt_space" to="/orders">Bar</Link>
                <Link className="button homeModule_bt_space" to="/administration">Voorraad Beheer</Link>
            </div>
            <Logout/>
        </>
    );
}