import React from "react";
import { useNavigate } from "react-router-dom";
import {
    AddProductToShoppingCart,
    PlaceOrder,
    RemoveAllProductOccurancesFromCart,
    RemoveProductFromShoppingCart
} from "../../urlMappings/TableRequests";
import {Actions} from "./Actions"
import {
    createIngredient,
    createProduct,
    deleteProduct,
    editIngredient,
    editProduct
} from "../../urlMappings/MenuRequests";


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
                break;
            case Actions.CREATE_PRODUCT:
                if (Object.keys(props.product).length===5 && props.ingredientList.length>0){
                    for (const key in props.product) {
                        if (!(String(props.product[key]).replace(/\s+/g, '').length>0)){
                            props.setFoutMelding(`Je hebt een lege input gegeven bij ${key.replace("-", " ")} `)
                            return;
                        }else{
                        }
                    }

                    createProduct(props.product.name,props.ingredientList,props.product.destination,props.product.category,props.product.details,props.product.price)
                        .then(res=>{
                            window.location.reload()
                            navigate(`/createproduct`)
                            }

                        ).catch(err=>{
                            console.log(err)
                    })
                }else{
                    props.setFoutMelding(`Je hebt een of meer lege input velden `)
                    return;
                }
                break;
            case Actions.UPDATE_PRODUCT:

                console.log(props.product.productCategory)

                if (Object.keys(props.product).length===7 && props.ingredientList.length>0){
                    for (const key in props.product) {
                        if (!(String(props.product[key]).replace(/\s+/g, '').length>0)){
                            props.setFoutMelding(`Je hebt een lege input gegeven bij ${key.replace("-", " ")} `)
                            return;
                        }
                    }

                    editProduct(props.product.id,props.product.name,props.product.productDestination,props.ingredientList,props.product.price,props.product.details,props.product.productCategory).
                    then(res=>{
                        props.setDisabled(true);
                        navigate(`/productdetails/${res.id}`)
                    }).catch(err=>{
                        console.log(err)
                    })
                }else{
                    console.log("ging heel fout")
                    props.setFoutMelding(`Je hebt een of meer lege input velden `)
                    return;
                }
                break;

            case Actions.CREATE_INGREDIENT:
                if (!(props.ingredient===undefined)){
                    for (const key in props.ingredient) {
                        console.log(props.ingredient[key].trim().length)
                        if (!(props.ingredient[key].trim().length>0)){
                            props.setFoutMelding(`Je hebt een lege input gegeven bij ${key.replace("-", " ")} `)
                            return;
                        }
                    }

                    createIngredient(props.ingredient.name)
                        .then(res=>{
                               window.location.reload()
                                navigate(`/createingredient`)
                            }
                        ).catch(err=>{

                    })
                }else{
                    props.setFoutMelding(`Je hebt een of meer lege input velden`)
                    return;
                }
                break;

            case Actions.UPDATE_INGREDIENT:
                if (props.ingredient.name.trim().length>0){
                    editIngredient(props.ingredient.id,props.ingredient.name)
                        .then(res=>{
                                props.setDisabled(true);
                                navigate(`/ingredientdetails/${res.id}`)
                            }
                        )
                }else{
                    props.setFoutMelding(`Je hebt een lege input gegeven  `)
                }
                break;

            case Actions.DELETE_PRODUCT:
                deleteProduct(props.product.id)
                    .then(res=>{
                            navigate(`/searchproduct`)
                        }
                    )
        }
    }

    return (
        <div>
            <button className={props.className} disabled={props.disabled} onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

