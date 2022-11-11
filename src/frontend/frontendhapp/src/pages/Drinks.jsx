import React from "react";
import "../styles/Drinks.css"
import "../styles/Home.css"
import "../styles/Lists.css"

import {Link} from "react-router-dom";
import DrinksMenu from "../components/DrinksMenu"


export default function Drinks() {

    return (
        <>
            <div className="drinksContainer">
                <Link className="button terug" to="/">Terug</Link>
                <Link to="/shoppingcart" className="button drinksToShoppingcart">Shopping cart</Link>
                <Link className="button drinksToFood" to="/Foods">Gerechten</Link>
                <DrinksMenu/>
            </div>


        </>
    );
}
