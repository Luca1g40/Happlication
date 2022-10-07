import React, {useEffect, useRef, useState} from "react";
import "../Drinks.css"
import {Link} from "react-router-dom";
import DataFetching from "../DataFetching"

export default function Drinks(){

    return (
        <>
            <div>
                <Link to="/"> Terug </Link>
            </div>
            <DataFetching/>
        </>
    );
}
