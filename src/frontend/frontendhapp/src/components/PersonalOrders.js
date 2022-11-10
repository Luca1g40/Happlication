import React, {useEffect, useState} from "react";
import SingleOrder from "./SingleOrder";
import {getPersonallyClaimedOrders} from "../urlMappings/OrderRequests";

function OrdersDataFetching() {
    const [orders, setOrders] = useState([])
    const [orderDone, setOrderDone] = useState(false)

    useEffect(() => {
        getPersonallyClaimedOrders()
            .then(res => {
                setOrders(res)
                setOrderDone(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [orderDone])


    return (
        <>
            <div className={"grid-container"}>
                {orders.map(order =>
                    <SingleOrder key={order.id} order={order} orderIsDone={setOrderDone}/>)
                }
            </div>
            <div className={"bottom-bar"}>
                <span>
                <p>Signed in as: {sessionStorage.getItem("name")}</p>
            </span>
            </div>
        </>
    )
}

export default OrdersDataFetching