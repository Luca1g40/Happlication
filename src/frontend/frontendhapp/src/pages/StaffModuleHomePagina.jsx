import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";
import Logout from "../components/utils/Logout"
import {CheckRights} from "../components/utils/CheckRights";


export default function StaffModuleHomePagina() {
    return (
        <>
            <h1>Staff module</h1>
            <div className="administration-grid">
                <Link className="button homeModule_bt_space" to="/administration">Voorraad Beheer</Link>
                <hr/>
                <hr/>
                <Link className={"button homeModule_bt_space"} to="/orders">Orders</Link>
                <Link className={"button homeModule_bt_space"} to="/staffdashboard">Ober omgeving</Link>

            </div>
            <CheckRights/>
            <Logout/>
        </>
    );
}