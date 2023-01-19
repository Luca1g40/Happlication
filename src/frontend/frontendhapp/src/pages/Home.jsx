import {Link} from "react-router-dom";
import Notifications from "../components/administration/Notifications";
import React from "react";
import "../styles/Home.css"
import "../styles/GlobalStyling.css"

export default function Home() {
    return <div className={"home-background"}>
        <div className="home-container home-button-grid">
            <Link className="button navigation-buttons-menu space-around" to="/menu/drinks">Dranken</Link>
            <hr></hr>
            <Link className="button navigation-buttons-menu space-around" to="/menu/foods">Gerechten</Link>
            <hr></hr>
            <Link className="button navigation-buttons-menu space-around" to="/allorders">Bestelling
                overzicht</Link>
            <hr></hr>
        </div>


            <Notifications/>


    </div>
}
