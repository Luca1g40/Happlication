import React from "react";
import Logout from "../components/utils/Logout"
import FetchTablesSetTrue from "../components/administration/FetchTablesSetTrue";
import {Link} from "react-router-dom";


export default function StaffDashboard() {
    return (
        <>
            <div className="staffContainer">
                <h1>Staff Dashboard</h1>
                <Link className="home-button-staff button" to="/staffmodule">Home</Link>

                <FetchTablesSetTrue/>
                <Logout/>
            </div>
        </>
    );
}
