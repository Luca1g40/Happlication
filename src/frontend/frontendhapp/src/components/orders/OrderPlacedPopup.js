import React from "react";


export default function OrderPlacedPopup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>Your order has been placed.</h1>
                <button className="close-btn" onClick={() => props.setTrigger(false)}> Close</button>
            </div>
        </div>
    ) : "";
}