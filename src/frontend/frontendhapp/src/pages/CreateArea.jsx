import React from "react";
import "../styles/AllStaffMembers.css"
import Logout from "../components/utils/Logout"
import HomeNav from "../components/utils/Homebutton"
import CreatingArea from "../components/administration/CreatingArea";
import {CheckRights} from "../components/utils/CheckRights";

export default function CreateArea() {
    return (
        <>
            <div>
                <h1>Nieuw Area aanmaken</h1>
                <CreatingArea/>
                <Logout/>
                <HomeNav/>
            </div>
            <CheckRights/>
        </>
    );
}
