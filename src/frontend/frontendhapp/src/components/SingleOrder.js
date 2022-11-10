import React, {useEffect, useState} from "react";
import {setOrderToDone} from "../urlMappings/OrderRequests";
import getOccuranceProducts from "./Util";

export default function SingleOrder(props) {

    const [readyProduct, setReadyProduct] = useState(0)
    const [disableButton, setDisableButton] = useState(true)

    useEffect(() => {
        console.log(props.order)
        toggleButton()

    }, [readyProduct])


    const changeStyle = event => {
        if (event.currentTarget.style.borderStyle) {
            event.currentTarget.style.borderStyle = null;
            event.currentTarget.style.backgroundColor = "#f8cfad"
            event.currentTarget.innerText = event.currentTarget.innerText.slice(0, -2)
            setReadyProduct(prevCount => prevCount - 1)
        } else {

            event.currentTarget.style.borderStyle = "unset"
            event.currentTarget.style.backgroundColor = "#FFB27B"
            event.currentTarget.innerText += " ✓"
            setReadyProduct(prevCount => prevCount + 1)

        }
    };

    function toggleButton() {
        if (readyProduct === Array.from(getOccuranceProducts(props.order.products).keys()).length) {
            setDisableButton(false);
        } else {
            setDisableButton(true)
        }
    }

    function orderIsDone() {
        console.log(props.order.id)
        setOrderToDone(props.order.id)
            .then(res => {
                console.log(res)
                props.orderIsDone(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div key={props.order.id} className={"grid-item grid-item"}>
            <p className={"table-number"}>Tafel: {props.order.tableNr}</p>
            {Array.from(getOccuranceProducts(props.order.products).keys()).map((product,index) =>
                <>
                <span key={product.id} className={"order-products"} onClick={(event) => {
                    changeStyle(event)
                }}>{product.name} </span>
                    <span>{Array.from(getOccuranceProducts(props.order.products).values())[index]}</span>
                </>

            )}
            <div className={"order-time"}>
                <p className={"order-time-paragraph"}> {props.order.orderTime}  </p>
                <p className={"order-date-paragraph"}> {props.order.orderDate} </p>
            </div>
            <div className={"order-done-button-div"}>
                <button className={"order-done-button"} disabled={disableButton} onClick={() => orderIsDone()}> ✓
                </button>
            </div>
        </div>
    )
}