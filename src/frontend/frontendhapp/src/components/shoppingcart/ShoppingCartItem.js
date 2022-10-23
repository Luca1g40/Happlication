import React , {useState}from "react";
import Counter from "../Counter";
import {Actions} from "../submitData/Actions";

export default function ShoppingCartItem({amount, productName, productId}) {
    const [productAmount, setProductAmount] = useState(amount)


    //TODO boton x grandi kuta kita tur di e producto ey for di e cart.
    return (
        <div>
            <p>{productName}</p>
            <Counter submitMode={true} tableId={69} addUpAction={Actions.ADD_TO_SHOPPING_CART} subtractAction={Actions.REMOVE_FROM_SHOPPING_CART} initialValue={productAmount} updateCount={count => setProductAmount(count)} productId={productId}/>
        </div>
    )
}