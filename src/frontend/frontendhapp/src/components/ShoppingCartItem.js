import React , {useState}from "react";
import Counter from "./Counter";

export default function ShoppingCartItem({amount, productName}) {
    const [productAmount, setProductAmount] = useState(amount)


    return (
        <div>
            <p>{productName}</p>
            <Counter initialValue={productAmount} updateCount={count => setProductAmount(count)}/>
        </div>
    )
}