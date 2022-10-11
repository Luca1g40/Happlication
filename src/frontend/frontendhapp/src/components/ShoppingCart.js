
import React,{useState,useEffect} from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import Counter from "./Counter";
export default function ShoppingCart() {
    const [shoppingCart, setShoppingCart] = useState();


    useEffect(() => {
        fetch("localhost:8080/happ/table/1/shoppingcart")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setShoppingCart(json);
            });
        }, [])

        // function countProduct(product){
        // let count = 0;
        //     shoppingCart.map((product){
        //
        //     }
        //         if
        //
        //
        //     )
        // }





    return (
        <div>
            {shoppingCart.map((item, index) => {

                return (
                    <div key={index}>
                        <ShoppingCartItem productName={item.name} amount={item.amount} />
                        <Counter initialValue={item.amount} />
                        <hr />
                    </div>
                );
            })}
        </div>

    )

}
