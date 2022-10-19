import React, {useState} from 'react'
import "../styles/Popup.css"

import Counter from "./Counter";
import SubmitButton from "./submitData/SubmitButton";


function ProductDetailsPopup(props) {
    const [productAmount, setProductAmount] = useState(1)

    function closePopUp() {
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <p>{props.product.name} </p>
                <Counter initialValue={productAmount} updateCount={count => setProductAmount(count)}/>
                <textarea disabled={true} value={props.product.details}/>
                <button className="close-btn" onClick={closePopUp}> close</button>
                <SubmitButton tableId={1} buttonText={"Add to Cart"} action={"Add to shopping cart"}
                              productAmount={productAmount} productId={props.product.id}/>
            </div>
        </div>
    ) : "";

}

export default ProductDetailsPopup