import React from "react";
import "../styles/AllOrders.css"

import UnclaimedOrdersComponent from "../components/UnclaimedOrdersComponent";

export default function Orders() {

    return <>
        <div className="orderContainer">
            <UnclaimedOrdersComponent rights={sessionStorage.getItem("rights")}/>
        </div>
    </>

}