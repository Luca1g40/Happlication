import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";
import Logout from "../components/utils/Logout"

export default function AdministrationPage() {
    return (
        <>
            <h1>Administration</h1>
            <div className="administration-grid">
                <Link className="button homeModule_bt_space" to="/createproduct">Create Product</Link>
                <Link className="button homeModule_bt_space" to="">Delete Product</Link>
                <Link className="button homeModule_bt_space" to="">Update Product</Link>
                <Link className="button homeModule_bt_space" to="/searchproduct">Get All Products</Link>
                <hr/><hr/>
                <Link className="button homeModule_bt_space" to="/createingredient">Create ingredient</Link>
                <Link className="button homeModule_bt_space" to="/createcategory">Create Menu Category</Link>
                <hr/><hr/>
                <Link className="button homeModule_bt_space" to="/searchcategory">Get all categories</Link>

                <hr/>
                <Link className="button homeModule_bt_space" to="/createStaff">Create Staff</Link>
                <Link className="button homeModule_bt_space" to="/allStaffMembers">Get All Staff</Link>
                <hr/>
                <Link className="button homeModule_bt_space" to="/createarea">Create Area</Link>
                <Link className="button homeModule_bt_space" to="/areas">Get All Areas</Link>

            </div>
            <Link to="/staffmodule" className="button login-button" >Home</Link>
            <Logout/>
        </>
    );
}