import React from "react";


import "../styles/StaffDashboard.css"
import FetchTablesSettedOnTrue from "../staff_components/FetchTablesSettedOnTrue";


export default function StaffDashboard() {
    return (
        <>
            <div className="staffContainer">
                <h1>Staff Dashboard</h1>
                <FetchTablesSettedOnTrue/>

            </div>
        </>
    );
}
