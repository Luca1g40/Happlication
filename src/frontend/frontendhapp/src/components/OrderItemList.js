import React, {useEffect, useState} from "react"
import OrderItem from "./OrderItem";
import getOccuranceProducts from "./Util";


export default function OrderItemList(props) {
    const [productsAlreadyAdded, setProductsAlreadyAdded] = useState([])



    useEffect(() => {
        console.log(props.order)

    }, [])


    return (
        <div>
            {Array.from(getOccuranceProducts(props.order.products).keys()).map((product,index) => {
                return <OrderItem key={product.id} product={product} amount={Array.from(getOccuranceProducts(props.order.products).values())[index]} className={"order-products"}/>
                }
            )}

        </div>)
}