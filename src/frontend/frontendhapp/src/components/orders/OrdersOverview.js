import React, {useEffect} from "react";
import OrderItemList from "./OrderItemList";

export default function OrdersOverview(props) {

    const changeStyle = event => {
        if (event.currentTarget.style.borderStyle) {
            event.currentTarget.style.borderStyle = null;
            event.currentTarget.style.backgroundColor = "#f8cfad"

        } else {
            event.currentTarget.style.borderStyle = "outset"
            event.currentTarget.style.backgroundColor = "#FFB27B"

        }
    };


    const addOrders = (selectedOrder) => {
        const index = props.selectedOrders.indexOf(selectedOrder);
        if (index > -1) {
            props.selectedOrders.splice(index, 1);
        } else {
            props.setSelectedOrders(state => [...state, selectedOrder])
        }
    }


    return (
        <div className={"grid-container"}>
            {
                props.orders.map(order =>
                    <div key={order.id} className={"grid-item"} onClick={(event) => {
                        addOrders(order.id);
                        changeStyle(event)
                    }}>
                        <p className={"table-number"}>Tafel: {order.tableNr}</p>
                        <div className={"order-item"}>
                            <OrderItemList staffRights={props.staffRights} order={order}/>
                        </div>
                        <div className={"order-time"}>
                            <p className={"order-time-paragraph"}> {order.orderTime} </p>
                            <p className={"order-date-paragraph"}> {order.orderDate} </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}