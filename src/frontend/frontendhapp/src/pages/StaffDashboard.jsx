import React from "react";
import Logout from "../components/Logout"
import "../styles/StaffDashboard.css"
import FetchTablesSettedOnTrue from "../staff_components/FetchTablesSettedOnTrue";


export default function StaffDashboard() {
    return (
        <>
            <div className="staffContainer">
                <h1>Staff Dashboard</h1>
                <FetchTablesSettedOnTrue/>
                <Logout/>
            </div>
        </>
    );
}
