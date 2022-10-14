
import React,{useState,useEffect} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import Counter from "./Counter";
import axios from "axios";
import SubmitButton from "./submitData/SubmitButton";
import {PlaceOrder} from "./submitData/UrlMappings"
import countOccuranceProduct from "./Util";

export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState([]);
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



        // function countProduct(target,list,setNewList){
        //     let count = 0;
        //     list.map((product)=>{
        //
        //         if (product === target) {
        //             count++;
        //         }
        //     }
        //     )
        //     setNewList(state => [...state,target]);
        //     return count;
        // }





    return (shoppingCart.length>0) ? (
        <div>
            {shoppingCart.map((item, index) => {
                if (!productsAlreadyAdded.includes(item)){
                    return (
                        <div key={item.id}>
                            <ShoppingCartItem productName={item.name} amount={countOccuranceProduct(item,shoppingCart,setProductsAlreadyAdded)} />
                            <hr />
                        </div>
                    );
                }

            })}
            <SubmitButton buttonText={"Order"} submitUrl={PlaceOrder(1)}/>
        </div>

    ) : <div> <h1 align="center">Your shoppingcart is empty</h1></div>

}
