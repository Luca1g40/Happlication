import React, {useState} from "react";
import ProductDetailsPopup from "./ProductDetailsPopup";


export default function MenuItem({product}) {
    const [buttonPopup, setButtonPopup] = useState(false)

    function displayPrice(price) {
        if (price.toString().includes(".")) {
            if (price.toString().split(".")[1].length === 1) {
                return price + "0";
            }
            return price;
        } else {
            return price + ".-";
        }
    }

    function handleClick() {
        setButtonPopup(true);
        console.log(buttonPopup)
    }

    return (
        <div className="listItemDiv">
            <ProductDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} product={product}/>
            <li key={product.id} className={"listItem"} onClick={handleClick}>
                <span className={"productSpan"}> {product.name}</span>
                <span>€</span>
                <span className={"productSpanPrice"}> {displayPrice(product.price)}</span>
            </li>
        </div>


    )


}