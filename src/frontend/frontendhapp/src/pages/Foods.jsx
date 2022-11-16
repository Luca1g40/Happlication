import React from "react";
import {Link} from "react-router-dom";
import FoodMenu from "../components/menu/FoodMenu"


import "../styles/Menu.css"
import "../styles/Home.css"
import "../styles/Lists.css"


export default function Foods() {
    return (
        <>
            <div className="menu-container">
                <Link className="button toHome" to="/"> Terug </Link>
                <div className={"top-right-navigation"}>
                    <Link to="/shoppingcart" className="button toShoppingcart">Shopping cart</Link>
                    <Link className="button toDrinks" to="/Drinks">Dranken</Link>
                </div>
                <FoodMenu/>
            </div>
        </>
    );
}
