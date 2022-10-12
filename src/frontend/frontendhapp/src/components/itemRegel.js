import React, {useState} from "react";
import Popup from "./Popup";


export default function ItemRegel({product}){
    const [buttonPopup, setButtonPopup] = useState(false)
    const [item,setItem] = useState();

    return(
        <div className="listItemDiv">
            <li key={product.id} className={"listItem"}  onClick={() => {
                setButtonPopup(true);
            }}>
                <Popup trigger={buttonPopup}
                       setTrigger={setButtonPopup}> {product.name} {product.price} </Popup>
                <span className={"productSpan"}> {product.name}</span>
                <span>€</span>
                <span className={"productSpanPrice"}> {product.price}.-</span>
            </li>
        </div>



    )


}