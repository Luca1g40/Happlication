import React, {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import SubmitButton from "../submitData/SubmitButton";
import {GetShoppingCart, PlaceOrder} from "../../urlMappings/TableRequests";
import {Actions} from "../submitData/Actions";
import countOccurances from "../Util"

export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);
    //const [productsAlreadyAdded, setProductsAlreadyAdded] = useState([])


    useEffect(() => {

        GetShoppingCart(52)
            .then(res => {
                setShoppingCart(res)

                console.log(shoppingCart.length)
                //console.log(countOccurances(shoppingCart))
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
            <SubmitButton buttonText={"Order"} tableId={52} action={Actions.PLACE_ORDER}/>
        </div>

    ) : <div><h1 align="center">Your shoppingcart is empty</h1></div>

}
