import React from "react";
import "../styles/AllOrders.css"

import UnclaimedOrdersComponent from "../components/orders/UnclaimedOrdersComponent";

export default function Orders() {

    return <>
            <UnclaimedOrdersComponent rights={sessionStorage.getItem("rights")}/>
    </>

}