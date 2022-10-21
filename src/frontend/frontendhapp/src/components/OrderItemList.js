import React, {useEffect, useState} from "react"
import OrderItem from "./OrderItem";

export default function OrderItemList(props) {
    const [orderProducts, setOrderProducts] = useState([])
    const [productsAlreadyAdded, setProductsAlreadyAdded] = useState([])



    useEffect(() => {
        console.log(props.order)

    }, [])


    return (
        <div>
            {props.order.products.map((product) => {
                    if (!productsAlreadyAdded.includes(product)) {
                        return <OrderItem key={product.id} product={product} amount={1} className={"order-products"}/>
                    } else {
                        setProductsAlreadyAdded(state => [...state, product]);
                    }
                }
            )}

        </div>)
}