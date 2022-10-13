import React, {useState} from 'react'
import "../styles/Popup.css"
import Counter from "./Counter";
import SubmitButton from "./SubmitButton";


function Popup(props) {


    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={() => {props.setTrigger(false); console.log(props.trigger);}}> close</button>
                <p>{props.product.name} </p>
                <textarea disabled={true} value={props.product.details}/>
                <SubmitButton buttonText={"Add to Cart"}/>


            </div>
            <Counter initialValue={0}/>
        </div>
    ) : "";

}

export default Popup