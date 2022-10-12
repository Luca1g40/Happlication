import React, {useEffect, useState} from "react";
import axios from "axios";

function OrdersDataFetching() {
    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState([])
    const [doneSelecting, setDoneSelecting] = useState(false)
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/happ/orders")
            .then(res => {
                console.log(res)
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [doneSelecting])

    const changeStyle = event => {
        if (event.currentTarget.style.borderStyle) {
            event.currentTarget.style.borderStyle = null;
        } else {
            event.currentTarget.style.borderStyle = "outset"
        }
    };

    function claimOrder(orders){
        console.log(orders)
        axios.post(`http://localhost:8080/happ/staff/86/claim`,{ //TODO Een random staffmember moet de claim maken niet 86
            "selectedOrders" : orders
        })
            .then(res => {
                console.log(res)
                setDoneSelecting(false)
                setSelectedOrders([])})
            .catch(err => {
                console.log(err)
            })
    }

    const addOrders = (selectedOrder) => {
        const index = selectedOrders.indexOf(selectedOrder);
        if (index > -1) {
            selectedOrders.splice(index, 1);
        } else {
            setSelectedOrders(state => [...state, selectedOrder])
        }
    }


    return (
        <div>
         <div className={"grid-container"}>
            {
                orders.map((order, i) =>
                    <div key={order.id} className={"grid-item grid-item"+i} onClick={() => {addOrders(order.id)}}>
                        <div className={"order-item"}>
                            <p className={"table-number"}>{order.tableNr}</p>
                            {order.foodProducts.map(product =>
                                <p key={product.id} className={"order-products"}>{product.name}</p>
                            )}
                        </div>
                        <div className={"order-time"}>
                            <p> {order.orderTime} {order.orderDate} </p>
                        </div>
                    </div>
                )
            }
        </div>
        <div className={"bottom-bar"}>
            <div className={"claim-order-button"}>
                <button onClick={() => {claimOrder(selectedOrders); setDoneSelecting(true)}}> DOE DINGEN TOEVOEGEN EN ZO</button>
            </div>
        </div>
    </div>
    )


}

export default OrdersDataFetching