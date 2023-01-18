import React from "react";
import AllArea from "../components/administration/AllArea";
import Logout from "../components/utils/Logout";
import HomeNav from "../components/utils/Homebutton";

export default function AllAreas() {
    return(
        <>
            <div className="staffContainer">
                <h1>Alle Areas</h1>
                <AllArea/>
                <Logout/>
                <HomeNav/>


            </div>
        </>
    )
}