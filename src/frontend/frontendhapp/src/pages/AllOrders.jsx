import React from "react";
import "../styles/AllOrders.css"

import {Link} from "react-router-dom";
import OrdersDataFetching from "../components/OrdersDataFetching";

export default function AllOrders() {

    return <>
        <div className="orderContainer">
            <OrdersDataFetching/>
        </div>
    </>

}