import {Link} from "react-router-dom";
import Notifications from "../components/administration/Notifications";
import React from "react";
import "../styles/Home.css"
import "../styles/GlobalStyling.css"

export default function Home() {
    return <>
        <div className="home-container">
                <Link className="button navigation-buttons-menu space-around" to="menu/drinks">Dranken</Link>
                <Link className="button navigation-buttons-menu space-around" to="menu/foods">Gerechten</Link>
                <Link className="button navigation-buttons-menu space-around" to="allorders/208">Bestelling overzicht</Link>
            <Notifications/>
        </div>
    </>
}
