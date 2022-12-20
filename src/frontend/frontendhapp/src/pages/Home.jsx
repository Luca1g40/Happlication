import {Link} from "react-router-dom";
import Notifications from "../components/administration/Notifications";
import React from "react";
import "../styles/Home.css"
import "../styles/GlobalStyling.css"

export default function Home() {
    return <>
        <div className="home-container home-button-grid">
                <div>
                    <Link className="button navigation-buttons-menu space-around" to="menu/drinks">Dranken</Link>
                </div>
                <div>
                    <Link className="button navigation-buttons-menu space-around" to="menu/foods">Gerechten</Link>
                </div>
                <div>
                    <Link className="button navigation-buttons-menu space-around" to="allorders/208">Bestelling overzicht</Link>
                </div>
            <Notifications/>
        </div>
    </>
}
