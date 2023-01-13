import React from "react";
import "../styles/Menu.css"
import "../styles/Home.css"

import {Link} from "react-router-dom";
import DrinksMenu from "../components/menu/DrinksMenu"


export default function Drinks() {

    return (
        <>
            <div className="menu-container">
                <Link className="button" to="/home"> Terug </Link>
                <div className={"top-right-navigation"}>
                    <Link to="/shoppingcart" className="button">Shopping cart</Link>
                    <Link className="button" to="/Foods">Gerechten</Link>
                </div>
                <DrinksMenu/>
            </div>
        </>
    );
}
