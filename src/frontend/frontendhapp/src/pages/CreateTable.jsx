import React from "react";
import CreatingTable from "../components/administration/CreatingTable";
import "../styles/AllStaffMembers.css"
import Logout from "../components/utils/Logout";
import HomeNav from "../components/utils/Homebutton";

export default function CreateTable() {
    return (
        <>
            <div>
                <h1>Nieuw tafel aanmaken</h1>
                <CreatingTable/>
                <Logout/>
                <HomeNav/>
            </div>
        </>
    );
}

