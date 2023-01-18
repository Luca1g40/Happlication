import React from "react";
import CreatingStaff from "../components/administration/CreatingStaff";
import "../styles/AllStaffMembers.css"
import Logout from "../components/utils/Logout"
import HomeNav from "../components/utils/Homebutton"
import {CheckRights} from "../components/utils/CheckRights";

export default function CreateStaff() {
    return (
        <>
            <>
                <h1>Nieuw staff-member aanmaken</h1>
                <CreatingStaff/>
                <Logout/>
                <HomeNav/>
            </>
            <CheckRights/>
        </>
    );
}
