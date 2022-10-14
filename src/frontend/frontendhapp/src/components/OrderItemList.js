import React,{useState,useEffect} from "react"
import OrderItem from "./OrderItem";
import countOccuranceProduct from "./Util";

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
                    return <OrderItem product={product} amount={countOccuranceProduct(product,orderProducts,setProductsAlreadyAdded)}/>
                }

            }


            // <p key={product.id} className={"order-products"}>{product.name}</p>

        )}

    </div>)
}