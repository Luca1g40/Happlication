import React from "react";
import "./SubmitButton.css";
import {PlaceOrder,AddProductToShoppingCart} from "./UrlMappings"

export default function SubmitButton(props){

    function handleClick(){

        switch (props.action){
            case "Place order":
                PlaceOrder(props.tableId);
                break;

            case "Add product to shopping cart":
                AddProductToShoppingCart(props.tableId,props.productId,props.amount)
                break;
        }
        console.log("Added");
    }

    return(
        <div>
            <button onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

