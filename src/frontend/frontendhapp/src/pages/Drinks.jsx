import React from "react";
import "../styles/Menu.css"
import "../styles/Home.css"
import "../styles/Lists.css"

import {Link} from "react-router-dom";
import DrinksMenu from "../components/menu/DrinksMenu"


export default function Drinks() {

    return (
        <>
            <div className="menu-container">
                <Link className="button toHome" to="/"> Terug </Link>
                <div className={"top-right-navigation"}>
                    <Link to="/shoppingcart" className="button toShoppingcart">Shopping cart</Link>
                    <Link className="button toFoods" to="/Foods">Gerechten</Link>
                </div>
                <DrinksMenu/>
            </div>


        </>
    );
}
