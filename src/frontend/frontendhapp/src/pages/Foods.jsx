import React from "react";
import {Link} from "react-router-dom";
import FoodMenu from "../components/menu/FoodMenu"


import "../styles/Menu.css"
import "../styles/Home.css"


export default function Foods() {
    return (
        <>
            <div className="menu-container">
                <div className={"navigation-buttons-menu space-around"}>
                    <Link className="button toHome" to="/"> Terug </Link>
                    <Link to="/shoppingcart" className="button">Shopping cart</Link>
                    <Link className="button" to="/Drinks">Dranken</Link>
                </div>
                <FoodMenu/>
            </div>
        </>
    );
}
