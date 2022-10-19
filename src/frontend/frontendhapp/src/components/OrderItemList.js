import React, {useEffect, useState} from "react"
import OrderItem from "./OrderItem";

export default function OrderItemList(props) {
    const [orderProducts, setOrderProducts] = useState([])
    const [productsAlreadyAdded, setProductsAlreadyAdded] = useState([])


    function determineProducts() {
        if (props.staffRights === "BAR_RIGHTS") {
            setOrderProducts(props.order.drinkProducts);
        } else if (props.staffRights === "KITCHEN_RIGHTS") {
            setOrderProducts(props.order.foodProducts)
        }
    }

    useEffect(() => {

        determineProducts();
    }, [])


    return (
        <div>
            {orderProducts.map((product) => {
                    if (!productsAlreadyAdded.includes(product)) {
                        return <OrderItem key={product.id} product={product} amount={1} className={"order-products"}/>
                    } else {
                        setProductsAlreadyAdded(state => [...state, product]);
                    }
                }
            )}

        </div>)
}