import React from "react";
import AllStaffMembers from "../components/Administration/AllStaffMembers";
import Logout from "../components/utils/Logout"

export default function AllStaffmembers() {
    return (
        <>
            <div className="staffContainer">
                <h1>Alle Staff medewerkers</h1>
                <AllStaffMembers/>
                <Logout/>
            </div>
        </>
    );
}
