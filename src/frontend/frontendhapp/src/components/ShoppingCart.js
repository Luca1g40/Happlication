
import React,{useState,useEffect} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import Counter from "./Counter";
import axios from "axios";
export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState();
    const [productsAlreadyAdded,setProductsAlreadyAdded] = useState([])


    useEffect(() => {
        axios.get("localhost:8080/happ/table/1/shoppingcart")
            .then(res => {
                console.log(res)
                setShoppingCart(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        }, [])



        function countProduct(target){
            let count = 0;
            shoppingCart.map(()=>{
                for (product of shoppingCart) {
                    if (product === target) {
                        count++;
                    }
                }
            }
            )
            setProductsAlreadyAdded(state => [...state,target]);
            return count;
        }





    return (
        <div>
            {shoppingCart.map((item, index) => {
                if (!productsAlreadyAdded.includes(item)){
                    return (
                        <div key={index}>
                            <ShoppingCartItem productName={item.name} amount={countProduct(item)} />
                            <hr />
                        </div>
                    );
                }

            })}
        </div>

    )

}
