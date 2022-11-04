import React from "react";
import "./SubmitButton.css";
import {
    AddProductToShoppingCart,
    PlaceOrder,
    RemoveAllProductOccurancesFromCart,
    RemoveProductFromShoppingCart
} from "../../urlMappings/TableRequests";
import {Actions} from "./Actions"
import {createProduct} from "../../urlMappings/MenuRequests";


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

                console.log("added to shopping cart")
                break;
            case Actions.REMOVE_FROM_SHOPPING_CART:
                RemoveProductFromShoppingCart(props.tableId,props.productId);
                console.log("removed from shoppingcart")
                if (!(props.updateCount === undefined)){
                    console.log("in if")
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
                console.log("removed all")
                break;
            case Actions.CREATE_PRODUCT:
                console.log(props.inputs)
                console.log(props.ingredientList)
                // createProduct(props.productName,props.productIngredients,props.productDestination,props.productCategory,props.details,props.price)
        }
        console.log("Added");
    }

    return (
        <div>
            <button onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

