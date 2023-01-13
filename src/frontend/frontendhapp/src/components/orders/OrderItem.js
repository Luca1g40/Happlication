import React from "react";

export default function OrderItem(props) {
    return (<>
        <span className={"product-name"}>{props.product.name} </span>
        <span className={"product-amount"}>{props.amount}</span>
    </>)
}

