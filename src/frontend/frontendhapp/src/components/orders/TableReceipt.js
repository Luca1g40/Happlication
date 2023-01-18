import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {GetTableOrders} from "../../urlMappings/TableRequests";
import getOccurrenceProducts, {displayPrice} from "../utils/Util";
import "../../styles/AllOrders.css";
import {Link} from "react-router-dom";


export default function TableReceipt(props) {
    const [orders, setOrders] = useState([])
    let price = 0;

    let params = useParams();
    useEffect(() => {
        GetTableOrders(sessionStorage.getItem("tafelid"))
            .then(res => {
                console.log(res)
                setOrders(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function fillProductList(list) {
        let productsList = []
        list.map(order => {
            order.products.map(product => {
                console.log(product.name)
                productsList.push(product)
            })
        })
        return productsList;
    }

    return (
        <>
            <Link to="/" className="login-button button">Home</Link>
            <h1 className={"order-header"}>Bestellingen</h1>
            {Array.from(getOccurrenceProducts(fillProductList(orders)).keys()).map((product, index) => {
                    price = price + (product.price * Array.from(getOccurrenceProducts(fillProductList(orders)).values())[index]);

                    return (
                        <>
                            <div className={"list-item"} id={"bestelling-item"}>
                                <span
                                    className={"product-span"}>{Array.from(getOccurrenceProducts(fillProductList(orders)).values())[index]} {product.name}</span>
                                <span>€</span>
                                <span className={"product-price"}> {displayPrice(product.price)}</span>
                            </div>

                        </>
                    )
                }
            )}

            <div className={"list-item"} id={"total-price"}>
                <span className={"product-span"}> Total </span>
                <span>€</span>
                <span className={"product-price"}>{displayPrice(price)}</span>

            </div>
            <button className={"button"}>Afrekenen</button>
        </>
    )


}