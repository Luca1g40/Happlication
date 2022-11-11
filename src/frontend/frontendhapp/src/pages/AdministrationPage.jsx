import React from "react";
import "../styles/StaffModuleHomePagina.css"
import {Link} from "react-router-dom";


export default function AdministrationPage() {
    return (
        <>
            <div className="staffModuleHomePagina_container">
                <h1>Administration</h1>
                <div className="container2">
                    <Link className="button homeModule_bt_space" to="">Add Product</Link>
                    <Link className="button homeModule_bt_space" to="">Delete Product</Link>
                    <Link className="button homeModule_bt_space" to="">Update Product</Link>
                    <Link className="button homeModule_bt_space" to="">Get All Products</Link>
                    <hr/>
                    <Link className="button homeModule_bt_space" to="">Add Staff</Link>
                    <Link className="button homeModule_bt_space" to="">Delete Staff</Link>
                    <Link className="button homeModule_bt_space" to="">Update Staff</Link>
                    <Link className="button homeModule_bt_space" to="">Get All Staff</Link>
                    <Link className="button position-absolute bottom-0 end-0 m-4" to="/staff">Log out</Link>

                </div>
            </div>
        </>
    );
}