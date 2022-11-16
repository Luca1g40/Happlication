import React from "react";
import Logout from "../components/utils/Logout"
import FetchTablesSetTrue from "../components/administration/FetchTablesSetTrue";


export default function StaffDashboard() {
    return (
        <>
            <div className="staffContainer">
                <h1>Staff Dashboard</h1>
                <FetchTablesSetTrue/>
                <Logout/>
            </div>
        </>
    );
}
