import React, {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import SubmitButton from "../submitData/SubmitButton";
import {GetShoppingCart, PlaceOrder} from "../../urlMappings/TableRequests";
import {Actions} from "../submitData/Actions";
import getOccuranceProducts from "../Util"

export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);


    useEffect(() => {

        GetShoppingCart(69)
            .then(res => {
                setShoppingCart(res)
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
            {Array.from(getOccuranceProducts(shoppingCart).keys()).map((item, index) =>{
                return (
                    <span key={item.id}>
                            <ShoppingCartItem productName={item.name} amount={Array.from(getOccuranceProducts(shoppingCart).values())[index]}/>
                            <hr/>
                        </span>
                );
            })}
            <SubmitButton buttonText={"Order"} tableId={52} action={Actions.PLACE_ORDER}/>
        </div>

    ) : <div><h1 align="center">Your shoppingcart is empty</h1></div>

}
