import OrderItemList from "./OrderItemList";
import React from "react";
import getOccurrenceProducts from "../utils/Util";
import OrderItem from "./OrderItem";


export default function Receipt(props){

    return (
        <div className={"grid-container"}>
            {
                Array.from(getOccurrenceProducts(props.products).keys()).map((product, index)=>
                    <div className={"grid-item"} onClick={(event) => {

                    }}>
                        <p className={"table-number"}>Tafel: {"prototype"}</p>
                        <div className={"order-item"}>
                            <div className={"product-text"}>


                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )

}