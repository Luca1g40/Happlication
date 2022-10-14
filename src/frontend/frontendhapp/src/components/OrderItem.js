import React from "react";

export default function OrderItem(props){
    return(<p key={props.product.id}>{props.product.name} {props.amount}</p>)
}