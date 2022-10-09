import React from "react";
import "../styles/Drinks.css"
import "../styles/Home.css"
import "../styles/Lists.css"

import {Link} from "react-router-dom";
import DrinksDataFetching from "../components/DrinksDataFetching"

export default function Drinks() {

    return (
        <>
            <div className="drinksContainer">
                <Link className="button terug" to="/">Terug</Link>
                <Link className="button drinksToFood" to="/Foods">Gerechten</Link>
                <DrinksDataFetching/>
            </div>
        </>
    );
}
