import React from "react";
import Counter from "./Counter";

export default function ShoppingCartItem({amount, productName}) {

    return (
        <div>
            <p>{productName}</p>
            <Counter initialValue={amount}/>
        </div>
    )
}