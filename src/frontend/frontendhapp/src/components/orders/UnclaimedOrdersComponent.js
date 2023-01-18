import React, {useEffect, useState} from "react";
import {getAllUnclaimedOrders} from "../../urlMappings/OrderRequests";
import {claimSelectedOrders} from "../../urlMappings/StaffRequests";
import OrdersOverview from "./OrdersOverview";
import {useNavigate} from "react-router-dom";


function UnclaimedOrdersComponent(props) {
    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState([])
    const [doneSelecting, setDoneSelecting] = useState(false)
    let navigate = useNavigate()
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
        <>
            <OrdersOverview orders={orders} selectedOrders={selectedOrders} setSelectedOrders={setSelectedOrders}
                            staffRights={props.rights}/>
            <div className={"bottom-bar"}>
                <div className={"claim-order-button"}>
                    <button className={"buttons-navbar"} onClick={() => {
                        claimOrder(selectedOrders);
                        setDoneSelecting(true)
                    }}> Claim Orders
                    </button>
                    <button className={"buttons-navbar"} onClick={() => navigate("/claims")}>My orders</button>
                    <button className={"buttons-navbar"} onClick={() => navigate("/staffmodule")}>Staff module</button>

                </div>
                <span>
                    <p>Signed in as: {sessionStorage.getItem("staffId")}</p>
                </span>
            </div>
        </>
    )
}

export default UnclaimedOrdersComponent