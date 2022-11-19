import {Link} from "react-router-dom";
import FoodMenu from "../components/menu/FoodMenu";
import React from "react";

export default function Menu() {
    return (
        <>
            <div className="menu-container">
                <div className={"navigation-buttons-menu space-around"}>
                    <Link className="button toHome" to="/"> Terug </Link>
                    <Link to="/shoppingcart" className="button toShoppingcart">Shopping cart</Link>
                    <Link className="button toDrinks" to="/Drinks">Dranken</Link>
                </div>
                <FoodMenu/>
            </div>
        </>
    );
}
