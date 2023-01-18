import React, {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import SubmitButton from "../submitData/SubmitButton";
import {GetShoppingCart} from "../../urlMappings/TableRequests";
import {Actions} from "../submitData/Actions";
import getOccurrenceProducts from "../utils/Util";
import OrderPlacedPopup from "../orders/OrderPlacedPopup";
import {Link} from "react-router-dom";
import "../../styles/Shoppingcart.css";


export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [buttonPopUp,setButtonPopup] = useState(false);
    const tableid = sessionStorage.getItem("tafelid")

    useEffect(() => {
        GetShoppingCart(tableid)
            .then(res => {
                setShoppingCart(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (shoppingCart.length > 0) ? (
        <div className={"menu-container"}>
            <Link to="/" className="button toHome">Home</Link>
            <div className={"screen-title"}>
                <h1 align="center">Shopping cart</h1>
            </div>

            {Array.from(getOccurrenceProducts(shoppingCart).keys()).map((item, index) => {
                return (
                    <ShoppingCartItem key={item.id} productName={item.name} productId={item.id}
                                      amount={Array.from(getOccurrenceProducts(shoppingCart).values())[index]}
                                      updateShoppingCart={shoppingcart => setShoppingCart(shoppingcart)}/>
                );
            })}
                <SubmitButton className={"submit-button button"} buttonText={"Order"} tableId={tableid} action={Actions.PLACE_ORDER} emptyShoppingcart={()=>setShoppingCart([])} triggerPopUp={()=>setButtonPopup(true)}/>
        </div>

    ) : <div className={"menu-container"}>
            <Link to="/home" className="button toHome" >Home</Link>
            <h1 align="center">Your shoppingcart is empty</h1>
            <OrderPlacedPopup trigger={buttonPopUp} setTrigger={value =>setButtonPopup(value)}/>
        </div>

}
