import React, {useState} from 'react'
import "../styles/Popup.css"

import Counter from "./Counter";
import SubmitButton from "./submitData/SubmitButton";
import {Actions} from "./submitData/Actions"


function ProductDetailsPopup(props) {
    const [productAmount, setProductAmount] = useState(1)

    function closePopUp() {
        console.log("closing popup")
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <p>{props.product.name} </p>
                <Counter initialValue={productAmount} updateCount={count => setProductAmount(count)}/>
                <textarea disabled={true} value={props.product.details}/>
                <button className="close-btn" onClick={closePopUp}> close</button>
                <SubmitButton className="button foodsToDrinks" tableId={69} buttonText={"Add to Cart"} action={Actions.ADD_TO_SHOPPING_CART}
                              productAmount={productAmount} productId={props.product.id} trigger={() =>closePopUp()}/>
            </div>
        </div>
    ) : "";

}

export default ProductDetailsPopup