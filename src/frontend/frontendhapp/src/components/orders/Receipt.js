import OrderItemList from "./OrderItemList";
import React from "react";


export default function Receipt(props){

    return (
        <div className={"grid-container"}>
            {
                props.products.map(order =>
                    <div key={order.id} className={"grid-item"} onClick={(event) => {

                    }}>
                        <p className={"table-number"}>Tafel: {"prototype"}</p>
                        <div className={"order-item"}>
                            <OrderItemList staffRights={props.staffRights} order={order}/>
                        </div>

                    </div>
                )
            }
        </div>
    )

}