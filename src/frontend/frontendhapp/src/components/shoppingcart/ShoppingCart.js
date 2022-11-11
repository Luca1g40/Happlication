import React, {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import SubmitButton from "../submitData/SubmitButton";
import {GetShoppingCart} from "../../urlMappings/TableRequests";
import {Actions} from "../submitData/Actions";
import getOccuranceProducts from "../Util";
import OrderPlacedPopup from "../OrderPlacedPopup";
import "../../styles/Shoppingcart.css";



export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [buttonPopUp,setButtonPopup] = useState(false);

    useEffect(() => {
        GetShoppingCart(547)
            .then(res => {
                setShoppingCart(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (shoppingCart.length > 0) ? (
        <div className={"foodContainer"}>
            <div className={"screen-title"}>
                <h1 align="center">Shopping cart</h1>
            </div>

            {Array.from(getOccuranceProducts(shoppingCart).keys()).map((item, index) =>{
                return (
                    <ShoppingCartItem key={item.id} productName={item.name} productId={item.id} amount={Array.from(getOccuranceProducts(shoppingCart).values())[index]} updateShoppingCart={shoppingcart => setShoppingCart(shoppingcart)}/>
                );
            })}
            <SubmitButton buttonText={"Order"} tableId={547} action={Actions.PLACE_ORDER} emptyShoppingcart={()=>setShoppingCart([])} triggerPopUp={()=>setButtonPopup(true)}/>
        </div>

    ) : <div>
        <h1 align="center">Your shoppingcart is empty</h1>
        <OrderPlacedPopup trigger={buttonPopUp} setTrigger={value =>setButtonPopup(value)}/>

        </div>

}
