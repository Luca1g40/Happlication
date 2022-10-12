import React, {useEffect, useState} from "react";
import axios from "axios";

function OrdersDataFetching() {
    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState([])
    const [doneSelecting, setDoneSelecting] = useState(false)

    useEffect(() => {
        console.log(doneSelecting)
        axios.get("http://localhost:8080/happ/orders")
            .then(res => {
                console.log(res)
                setOrders(res.data)
                setDoneSelecting(false);
            })
            .catch(err => {
                console.log(err)
            })
    }, [doneSelecting])

    function claimOrder(orders){
        axios.post(`http://localhost:8080/happ/orders/claim`,{
            id:"86",
            "orders" : orders
        }) //TODO Een staffmember moet de claim maken
            .then(res => {
                console.log(res)})
            .catch(err => {
                console.log(err)
            })
    }

    const addOrders = (selectedOrder) => {
        setSelectedOrders(state => [...state, selectedOrder])
    }


    return (
     <div className={"grid-container"}>
        {
            orders.map((order, i) =>
                <div key={order.id} className={"grid-item grid-item"+i} onClick={() => addOrders(order.id)}>
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

        <button onClick={() => {claimOrder(selectedOrders); setDoneSelecting(true)}}> DOE DINGEN TOEVOEGEN EN ZO</button>
    </div>
    )


}

export default OrdersDataFetching