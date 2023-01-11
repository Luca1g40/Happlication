import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";
import Logout from "../components/utils/Logout"


export default function StaffModuleHomePagina() {
    return (
        <>
            <h1>Staff module</h1>
            <div className="administration-grid">
                <Link className="button homeModule_bt_space" to="/home">Home</Link>
                <Link className="button homeModule_bt_space" to="/administration">Voorraad Beheer</Link>
                <hr/><hr/>
                <Link className={"button homeModule_bt_space"} to="/orders">Orders</Link>
            </div>
            <Logout/>
        </>
    );
}