import React, {useEffect, useState} from "react";
import SingleOrder from "./SingleOrder";
import {getPersonallyClaimedOrders} from "../urlMappings/OrderRequests";
import {Link, useNavigate} from "react-router-dom";

function OrdersDataFetching() {
    const [orders, setOrders] = useState([])
    const [orderDone, setOrderDone] = useState(false)
    let navigate = useNavigate()


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
                <div className={"claim-order-button"}>
                    <button className={"buttons-navbar"} onClick={()=>navigate("/orders")}>All orders</button>
                    <button className={"buttons-navbar"} onClick={()=>navigate("/staffmodule")}>Staff module</button>

                </div>
                <span>
                    <p>Signed in as: {sessionStorage.getItem("staffId")}</p>
                </span>
            </div>
        </>
    )
}

export default OrdersDataFetching