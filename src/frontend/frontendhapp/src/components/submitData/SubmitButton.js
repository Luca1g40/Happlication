import React from "react";
import "../../styles/SubmitButton.css";

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
                if (!(props.emptyShoppingcart === undefined)){
                    props.emptyShoppingcart();
                }

                if (!(props.triggerPopUp === undefined)){
                    props.triggerPopUp();
                }
                break;

            case Actions.ADD_TO_SHOPPING_CART:
                AddProductToShoppingCart(props.tableId, props.productId, props.productAmount)
                if (!(props.trigger === undefined)){
                    props.trigger();
                }

                if (!(props.updateCount === undefined)){
                    props.updateCount();
                }
                break;
            case Actions.REMOVE_FROM_SHOPPING_CART:
                RemoveProductFromShoppingCart(props.tableId,props.productId);
                if (!(props.updateCount === undefined)){
                    props.updateCount();
                }

                break;
            case Actions.REMOVE_ALL_OCCURANCES_OF_A_PRODUCT:
                RemoveAllProductOccurancesFromCart(props.tableId,props.productId)
                    .then(res => {
                        if (!(props.updateShoppingCart === undefined)){
                            props.updateShoppingCart(res);
                        }
                        console.log(res)

                    })
                    .catch(err => {
                        console.log(err)
                    });
                break;
        }
    }

    return (
        <div className={"submit-button-div"}>
            <button className={"submit-button"} onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

