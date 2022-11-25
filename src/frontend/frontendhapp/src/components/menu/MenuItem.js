import React, {useState} from "react";
import ProductDetailsPopup from "../product/ProductDetailsPopup";


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
    }

    return (
        <div className="listItemDiv">
            <ProductDetailsPopup trigger={buttonPopup} setTrigger={setButtonPopup} product={product}/>
            <li key={product.id} className={"list-item"} onClick={handleClick}>
                <span className={"product-span"}> {product.name}</span>
                <span>€</span>
                <span className={"product-price"}> {displayPrice(product.price)}</span>
            </li>
        </div>


    )


}