import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";
import Logout from "../components/Logout"
import "../styles/SubmitButton.css"


export default function AdministrationPage() {
    return (
        <>
            <h1>Administration</h1>
            <div className="container2">
                <Link className="button homeModule_bt_space" to="/createproduct">Create Product</Link>
                <Link className="button homeModule_bt_space" to="">Delete Product</Link>
                <Link className="button homeModule_bt_space" to="">Update Product</Link>
                <Link className="button homeModule_bt_space" to="/searchproduct">Get All Products</Link>
                <Link className="button homeModule_bt_space" to="/createingredient">Create ingredient</Link>
                <hr/>
                <Link className="button homeModule_bt_space" to="/createStaff">Create Staff</Link>
                <Link className="button homeModule_bt_space" to="/allStaffMembers">Get All Staff</Link>
                <Logout/>

            </div>
        </>
    );
}