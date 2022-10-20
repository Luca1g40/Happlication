import React from "react";
import "./SubmitButton.css";
import {AddProductToShoppingCart, PlaceOrder} from "../../urlMappings/TableRequests";
import {Actions} from "./Actions"


export default function SubmitButton(props) {

    function handleClick() {

        switch (props.action) {
            case Actions.PLACE_ORDER:
                PlaceOrder(props.tableId);
                break;

            case Actions.ADD_TO_SHOPPING_CART:
                AddProductToShoppingCart(props.tableId, props.productId, props.productAmount)
                console.log(props.trigger == undefined)
                if (!props.trigger == undefined){
                    props.trigger();
                }
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

