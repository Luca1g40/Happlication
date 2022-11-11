import React, {useEffect, useState} from "react";
import {getAllUnclaimedOrders} from "../urlMappings/OrderRequests";
import {claimSelectedOrders} from "../urlMappings/StaffRequests";
import OrdersOverview from "./OrdersOverview";
import {Link} from "react-router-dom";


function UnclaimedOrdersComponent(props) {
    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState([])
    const [doneSelecting, setDoneSelecting] = useState(false)

    useEffect(() => {
        getAllUnclaimedOrders()
            .then(res => {
                setOrders(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [doneSelecting])


    function claimOrder(orderIds) {
        claimSelectedOrders(orderIds)
            .then(res => {
                setDoneSelecting(false)
                setSelectedOrders([])
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <OrdersOverview orders={orders} selectedOrders={selectedOrders} setSelectedOrders={setSelectedOrders} staffRights={props.rights}/>
            <div className={"bottom-bar"}>
                <div className={"claim-order-button"}>
                    <button onClick={() => {
                        claimOrder(selectedOrders);
                        setDoneSelecting(true)
                    }}> Claim Orders
                    </button>
                </div>
                <span>
                    <p>Signed in as: {sessionStorage.getItem("staffId")}</p>
                    <Link to={"/claims"} >Claims</Link>
                </span>
            </div>
        </div>
    )
}

export default UnclaimedOrdersComponent