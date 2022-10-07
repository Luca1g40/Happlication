import React, {useEffect, useRef, useState} from "react";
import "../Drinks.css"
import {Link} from "react-router-dom";
import DrinksDataFetching from "../DrinksDataFetching"

export default function Drinks(){

    return (
        <>
            <div>
                <Link to="/"> Terug </Link>
            </div>
            <DrinksDataFetching/>
        </>
    );
}
