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
//TODO pa orabo primi plus of min bo update e shoppingcart
export function RemoveProductFromShoppingCart(tableId, productId) {
    axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart/remove/product`, {
        "id": productId
    }, configuration)
        .then(res => {
            console.log(productId)
            console.log(res)
        })
        .catch(err => {
            console.log(productId)
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
    axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart/remove/products`,{
        "id":productId
    },configuration)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}