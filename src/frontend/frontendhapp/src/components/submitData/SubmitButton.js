import React from "react";
import "./SubmitButton.css";
import {
    AddProductToShoppingCart,
    PlaceOrder,
    RemoveAllProductOccurancesFromCart,
    RemoveProductFromShoppingCart
} from "../../urlMappings/TableRequests";
import {Actions} from "./Actions"


export default function SubmitButton(props) {

    function handleClick() {
        switch (props.action) {
            case Actions.PLACE_ORDER:
                PlaceOrder(props.tableId);
                break;

            case Actions.ADD_TO_SHOPPING_CART:
                AddProductToShoppingCart(props.tableId, props.productId, props.productAmount)
                if (!(props.trigger === undefined)){
                    props.trigger();
                }
                if (!props.updateCount === undefined){
                    props.updateCount();
                }
                props.updateCount();
                console.log("added to shopping cart")
                break;
            case Actions.REMOVE_FROM_SHOPPING_CART:
                RemoveProductFromShoppingCart(props.tableId,props.productId);
                console.log("removed from shoppingcart")
                if (!props.updateCount === undefined){
                    console.log("in if")
                    props.updateCount();
                }
                props.updateCount();

                break;
            case Actions.REMOVE_ALL_OCCURANCES_OF_A_PRODUCT:
                RemoveAllProductOccurancesFromCart(props.tableId,props.productId);
                break;
        }
        console.log("Added");
    }

    return (
        <div>
            <button onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

