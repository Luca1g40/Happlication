import React , {useState}from "react";
import Counter from "../Counter";
import {Actions} from "../submitData/Actions";
import SubmitButton from "../submitData/SubmitButton";

export default function ShoppingCartItem(props) {
    const [productAmount, setProductAmount] = useState(props.amount)


    return (
        <div className={"shoppingcart-grid"}>
            <p className={"grid-item-1"}>{props.productName}</p>
            <Counter className={"grid-item-2"} submitMode={true} tableId={562} addUpAction={Actions.ADD_TO_SHOPPING_CART} subtractAction={Actions.REMOVE_FROM_SHOPPING_CART} initialValue={productAmount} updateCount={count => setProductAmount(count)} productId={props.productId}/>
            <SubmitButton className={"delete-button"} tableId={562} action={Actions.REMOVE_ALL_OCCURANCES_OF_A_PRODUCT} productId={props.productId} buttonText={"x"} updateShoppingCart={shoppingcart => props.updateShoppingCart(shoppingcart)}/>
        </div>
    )
}