import React, {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import axios from "axios";
import SubmitButton from "./submitData/SubmitButton";
import {GetShoppingCart, PlaceOrder} from "../urlMappings/TableRequests";
import {Actions} from "./submitData/Actions"

export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [productsAlreadyAdded, setProductsAlreadyAdded] = useState([])


    useEffect(() => {

        GetShoppingCart(43)
            .then(res => {
                setShoppingCart(res)
                console.log(shoppingCart.length )
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (shoppingCart.length > 0) ? (

        <div className={"listDiv"}>
            <div>
                <h1 align="center">Shopping cart</h1>
            </div>
            {shoppingCart.map((item, index) => {
                    return (
                        <span key={item.id}>
                            <ShoppingCartItem productName={item.name} amount={1}/>
                            <hr/>
                        </span>
                    );
            })}
            <SubmitButton buttonText={"Order"} submitUrl={() => PlaceOrder(43)}/>
        </div>

    ) : <div><h1 align="center">Your shoppingcart is empty</h1></div>

}
