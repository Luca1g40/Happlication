import React from "react";
import CreatingStaff from "../components/administration/CreatingStaff";
import "../styles/AllStaffMembers.css"
import Logout from "../components/utils/Logout"
import HomeNav from "../components/utils/Homebutton"

export default function CreateStaff() {
    return (
        <>
            <div>
                <h1>Nieuw staff-member aanmaken</h1>
                <CreatingStaff/>
                <Logout/>
                <HomeNav/>
            </div>
        </>
    );
}
