import {Link} from "react-router-dom";
import Notifications from "../components/administration/Notifications";
import React from "react";
import "../styles/Home.css"
import "../styles/GlobalStyling.css"

export default function Home() {
    return <>
        <div className="home-container">
                <Link className="button navigation-buttons-menu space-around" to="Drinks">Dranken</Link>
                <Link className="button navigation-buttons-menu space-around" to="Foods">Gerechten</Link>
            <Notifications/>
        </div>
    </>
}

