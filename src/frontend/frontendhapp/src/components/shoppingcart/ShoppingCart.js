import React, {useEffect, useState} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import SubmitButton from "../submitData/SubmitButton";
import {GetShoppingCart} from "../../urlMappings/TableRequests";
import {Actions} from "../submitData/Actions";
import getOccuranceProducts from "../Util";
import OrderPlacedPopup from "../OrderPlacedPopup";
import {Link} from "react-router-dom";



export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);
    const [buttonPopUp,setButtonPopup] = useState(false);

    useEffect(() => {
        GetShoppingCart(138)
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
                            <ShoppingCartItem productName={item.name} productId={item.id} amount={Array.from(getOccuranceProducts(shoppingCart).values())[index]} updateShoppingCart={shoppingcart => setShoppingCart(shoppingcart)}/>
                            <hr/>
                        </span>
                );
            })}
            <SubmitButton buttonText={"Order"} tableId={69} action={Actions.PLACE_ORDER} emptyShoppingcart={()=>setShoppingCart([])} triggerPopUp={()=>setButtonPopup(true)}/>
        </div>

    ) : <div>
        <Link to="/" className="button" >Home</Link>
        <h1 align="center">Your shoppingcart is empty</h1>
        <OrderPlacedPopup trigger={buttonPopUp} setTrigger={value =>setButtonPopup(value)}/>

        </div>

}
