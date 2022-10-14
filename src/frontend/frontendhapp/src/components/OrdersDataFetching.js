import React, {useEffect, useState} from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import countOccuranceProduct from "./Util";
import OrderItemList from "./OrderItemList"


function OrdersDataFetching(props) {
    const [orders, setOrders] = useState([])
    const [selectedOrders, setSelectedOrders] = useState([])
    const [doneSelecting, setDoneSelecting] = useState(false)
    const [isActive, setIsActive] = useState(false);

    const config = {
        headers: {
            Authorization: sessionStorage.getItem("Authorization")

        }
    }

    useEffect(() => {
        axios.get("http://localhost:8080/happ/orders", config)
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
            event.currentTarget.style.backgroundColor = "#f8cfad"


        } else {
            event.currentTarget.style.borderStyle = "outset"
            event.currentTarget.style.backgroundColor = "#FFB27B"

        }
    };


    function claimOrder(orders){
        console.log()
        const staffId = sessionStorage.getItem("name");
        axios.post(`http://localhost:8080/happ/staff/${staffId}/claim`,{ //TODO Een random staffmember moet de claim maken niet 86
            "selectedOrders" : orders
        }, config)
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
                    <div key={order.id} className={"grid-item grid-item"+i} onClick={(event) => {addOrders(order.id); changeStyle(event)}}>
                        <div className={"order-item"}>
                            <p className={"table-number"}>{order.tableNr}</p>
                            <OrderItemList order={order} staffRole={"bar"}/>

                            {/*{order.foodProducts.map(product =>*/}
                            {/*        <OrderItem product={product} amount={countOccuranceProduct(product,order.foodProducts,setProductsAlreadyAdded)}/>*/}

                            {/*    // <p key={product.id} className={"order-products"}>{product.name}</p>*/}

                            {/*)}*/}
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
                <button onClick={() => {claimOrder(selectedOrders); setDoneSelecting(true)}}> Claim Orders </button>
            </div>
            <span>
                <p>Signed in as: {sessionStorage.getItem("name")}</p>
            </span>
        </div>
    </div>
    )


}

export default OrdersDataFetching