import React,{useState,useEffect} from "react"
import OrderItem from "./OrderItem";

export default function OrderItemList({order,staffRole}){
    const [orderProducts,setOrderProducts] = useState([])
    const [productsAlreadyAdded,setProductsAlreadyAdded] = useState([])


    function determineProducts(){
        if (staffRole === "bar"){
            setOrderProducts(order.drinkProducts);
        }else if (staffRole === "kitchen"){
            setOrderProducts(order.foodProducts)
        }
    }

    useEffect(() => {
        determineProducts();
    }, [])


    return (
        <div>
            {orderProducts.map((product) => {
                if(!productsAlreadyAdded.includes(product)){
                    return <OrderItem key={product.id} product={product} amount={1} className={"order-products"}/>
                }else{
                    setProductsAlreadyAdded(state => [...state,product]);
                }
            }


        )}

    </div>)
}