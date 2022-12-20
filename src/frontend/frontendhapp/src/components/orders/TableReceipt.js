import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {GetTableOrders} from "../../urlMappings/TableRequests";
import getOccurrenceProducts from "../utils/Util";
import "../../styles/AllOrders.css";


export default function TableReceipt(props){
    const [orders,setOrders] = useState([])
    let price = 0;

    let params = useParams();
    useEffect(() => {
        GetTableOrders(params.id)
            .then(res => {
                console.log(res)
                setOrders(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    function fillProductList(list){
        let productsList =[]
        list.map(order => {
            order.products.map(product => {
                 console.log(product.name)
                 productsList.push(product)
            })
        })
        return productsList;
    }

    return(
        <div>

            { Array.from(getOccurrenceProducts(fillProductList(orders)).keys()).map((product, index) => {
                    price = price + (product.price * Array.from(getOccurrenceProducts(fillProductList(orders)).values())[index]);

                    return (
                            <>
                                <span className={"product-name"}> {product.name} ${product.price}</span>
                                <span className={"product-amount"}>{Array.from(getOccurrenceProducts(fillProductList(orders)).values())[index]}</span>
                            </>
                        )
                }
            )}
            <p> Total : ${price}</p>
        </div>
    )





}