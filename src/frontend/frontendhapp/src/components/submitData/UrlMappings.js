import axios from "axios";
import React, {useEffect, useState} from "react";


export  function AddProductToShoppingCart(tableId,productId,amount){
    axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart`,{
        "id" : productId,
        "amount": amount
    })
        .then(res => {
            console.log(res)
            return res;
            })
        .catch(err => {
            console.log(err)
        })

}

export  function PlaceOrder(tableId){
    axios.post(`http://localhost:8080/happ/table/${tableId}/order`)
        .then(res => {
            console.log(res)
            return res;
            })
        .catch(err => {
            console.log(err)
        })

}
// const configuration = {
//     headers: {
//         Authorization: sessionStorage.getItem("Authorization")
//
//     }
// }
// export default function getAllUnclaimedOrders(){
//     let unclaimedOrders = [];
//     axios.get("http://localhost:8080/happ/orders", configuration)
//         .then(res => {
//             console.log(123)
//             console.log(res.data)
//             unclaimedOrders= res.data;
//             // setOrders(res.data)
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     console.log(unclaimedOrders)
//     return unclaimedOrders;
// }

