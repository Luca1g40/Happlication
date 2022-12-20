import axios from "axios";
import {configuration} from "./JwtHeader";


export function AddProductToShoppingCart(tableId, productId, amount) {
     axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart`, {
        "id": productId,
        "amount": amount
    }, configuration)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}
export function RemoveProductFromShoppingCart(tableId, productId) {
    return axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart/remove/product`, {
        "id": productId
    }, configuration)
        .then(res => {
            console.log(res)
            return res.data.shoppingCart.productDataList;
        })
        .catch(err => {
            console.log(err)
        })
}

export function PlaceOrder(tableId) {
     axios.post(`http://localhost:8080/happ/table/${tableId}/order`,{},configuration)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export function GetShoppingCart(tableId){
    return axios.get(`http://localhost:8080/happ/table/${tableId}/shoppingcart`,configuration)
        .then(res => {
            console.log(res)
            return res.data.productDataList;
        })
        .catch(err => {
            console.log(err)
        })
}

export function RemoveAllProductOccurancesFromCart(tableId,productId){
   return axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart/remove/products`,{
        "id":productId
    },configuration)
        .then(res => {
            console.log(res.data.shoppingCart.productDataList)
            return res.data.shoppingCart.productDataList;
        })
        .catch(err => {
            console.log(err)
        })
}