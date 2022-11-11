import React from "react";
import CreatingStaff from "../administration_components/CreatingStaff";
import "../styles/AllStaffMembers.css"
import Logout from "../components/Logout"

export default function CreateStaff() {
    return (
        <>
            <div>
                <h1>Nieuw staff-member aanmaken</h1>
                <CreatingStaff/>
                <Logout/>
            </div>
        </>
    );
}
