import React from "react";
import {Link} from "react-router-dom";
import FoodsDataFetching from "../components/FoodsDataFetching"


import "../styles/Foods.css"
import "../styles/Home.css"
import "../styles/Lists.css"


export default function Foods() {
    return (
        <>
            <div className="foodContainer">
                <Link className="button foodsToHome" to="/"> Terug </Link>
                <Link className="button foodsToDrinks" to="/Drinks">Dranken</Link>
                <FoodsDataFetching/>

            </div>
        </>
    );
}