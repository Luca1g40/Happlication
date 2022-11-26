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
    createCategory,
    createIngredient,
    createProduct,
    deleteProduct,
    editIngredient,
    editProduct, updateCategory
} from "../../urlMappings/MenuRequests";


export default function SubmitButton(props) {
    let navigate = useNavigate();

    function validateProductObject(product,ingredientList,selectedImage){
        //dit is bij niet genoeg input velden ingevuld
        console.log(product)
        if (Object.keys(product).length===6 && ingredientList.length>0){
            for (const key in product) {
                if (!(String(product[key]).replace(/\s+/g, '').length>0)){
                    // dit is bj een iput veld met aleen spaties erin
                    props.setFoutMelding(`Je hebt een lege input gegeven bij ${key.replace("-", " ")} `)
                    return false;
                }else{
                }
            }

            if (!(selectedImage === undefined)){
                if (!(String(selectedImage.name).includes(".png") || String(selectedImage.name).includes(".jpg"))){
                    props.setFoutMelding("Upload een image file met de extensie .png of .jpg")
                    return false;
                }
                return true;
            }else{
                props.setFoutMelding("Je hebt geen image file meegegeven")
            }


        }else{
            props.setFoutMelding(`Je hebt een of meer lege input velden `)
            return false;
        }




    }

    function validateProductObjectByUpdate(product,ingredientList,selectedImage){
        //dit is bij niet genoeg input velden ingevuld
        if (Object.keys(product).length===9 && ingredientList.length>0){
            for (const key in product) {
                if (!(String(product[key]).replace(/\s+/g, '').length>0)){
                    // dit is bj een iput veld met aleen spaties erin
                    props.setFoutMelding(`Je hebt een lege input gegeven bij ${key.replace("-", " ")} `)
                    return false;
                }else{
                }
            }

            if (product.imagePath === undefined){
                if (!(selectedImage === undefined)){
                    if (!(String(selectedImage.name).includes(".png") || String(selectedImage.name).includes(".jpg"))){
                        props.setFoutMelding("Upload een image file met de extensie .png of .jpg")
                        return false;
                    }
                    return true;
                }else{
                    props.setFoutMelding("Je hebrt geen image file meegegeven")
                }
            }else{
                return true
            }



        }else{
            props.setFoutMelding(`Je hebt een of meer lege input velden `)
            return false;
        }




    }

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
                if (validateProductObject(props.product,props.ingredientList,props.selectedImage)){
                    createProduct(props.product.name,props.ingredientList,props.product.productDestination,props.product.productCategoryName,props.product.details,props.product.price,props.product.productType,props.selectedImage)
                        .then(res =>{
                            console.log(res)
                            window.location.reload()
                        }
                            )
                        .catch(err=>{
                        console.log(err)
                    })
                }

                break;
            case Actions.UPDATE_PRODUCT:


                if (validateProductObjectByUpdate(props.product,props.ingredientList,props.selectedImage)){
                    let imageChanged = true;
                    let image = props.selectedImage
                    if (image === undefined){
                        console.log("undefined if")
                        image = props.product.imagePath
                        imageChanged = false
                    }

                    console.log(image)
                    editProduct(props.product.id,props.product.name,props.product.productDestination,props.ingredientList,props.product.price,props.product.details, props.product.productCategoryName,props.product.productType , image, imageChanged).
                    then(res=>{
                        props.setDisabled(true);
                        navigate(`/productdetails/${res.id}`)
                    }).catch(err=>{
                        console.log(err)
                    })

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
                break;
            case Actions.CREATE_CATEGORY:
                createCategory(props.category.name)
                    .then(res=>{
                        window.location.reload()
                        navigate(`/createcategory`)
                        console.log(res)
                    }).catch(err=>{
                        console.log(err)
                })
                break;
            case Actions.UPDATE_CATEGORY:
                console.log(props.category)
                console.log("hierin")
                updateCategory(props.category.id,props.category.name)
                    .then(res=>{
                        console.log(res)
                    }).catch(err=>{
                    console.log(err)
                })
                break;
        }
    }

    return (
        <div>
            <button className={props.className} disabled={props.disabled} onClick={handleClick}>{props.buttonText}</button>
        </div>
    )
}

