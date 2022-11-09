import React from "react";
import "./SubmitButton.css";
import { useNavigate } from "react-router-dom";
import {
    AddProductToShoppingCart,
    PlaceOrder,
    RemoveAllProductOccurancesFromCart,
    RemoveProductFromShoppingCart
} from "../../urlMappings/TableRequests";
import {Actions} from "./Actions"
import {createIngredient, createProduct, editIngredient, editProduct} from "../../urlMappings/MenuRequests";


export default function SubmitButton(props) {
    let navigate = useNavigate();
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
                console.log(Object.keys(props.product))
                if (Object.keys(props.product).length===5 && props.ingredientList.length>0){
                    for (const key in props.product) {
                        if (!(props.product[key].trim().length>0)){
                            console.log("ging fout")
                            props.setFoutMelding(`Je hebt een lege input gegeven bij ${key.replace("-", " ")} je ezel`)
                            return;
                        }else{
                            console.log("ging goed")
                        }
                    }
                    console.log(props.product.destination, props.product.category)
                    createProduct(props.product.name,props.ingredientList,props.product.destination,props.product.category,props.product.details,props.product.price)
                        .then(res=>{
                            navigate(`/productdetails/${res.id}`)
                            }

                        ).catch(err=>{
                            console.log(err)
                    })
                    props.setMode(false);
                }else{
                    console.log("ging heel fout")
                    props.setFoutMelding(`Je hebt een of meer lege input velden je ezel`)
                    return;
                }
                break;
            case Actions.UPDATE_PRODUCT:
                editProduct(props.product.id,props.product.name,props.product.destination,props.ingredientList,props.product.price,props.product.details,props.product.category).
                then(res=>{
                    props.setDisabled(true);
                    navigate(`/productdetails/${res.id}`)
                }).catch(err=>{
                    console.log(err)
                })
                // navigate("/Orders")
                break;
            case Actions.CREATE_INGREDIENT:
                createIngredient(props.ingredient.name)
                    .then(res=>{
                            props.setDisabled(true);
                            navigate(`/ingredientdetails/${res.id}`)
                        }
                    ).catch(err=>{

                })
                break;
            case Actions.UPDATE_INGREDIENT:
                editIngredient(props.ingredient.id,props.ingredient.name)
                    .then(res=>{
                            props.setDisabled(true);
                            navigate(`/ingredientdetails/${res.id}`)
                        }
                    ).catch(err=>{

                })
                break;

        }
        console.log("Added");
    }

    return (
        <div>
            <button disabled={props.disabled} onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

