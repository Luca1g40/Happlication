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

export function getAllTables() {
    return axios.get("http://localhost:8080/happ/table", configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function DeleteTable(tableIdForDelete) {
    return axios.delete(`localhost:8080/happ/table/${tableIdForDelete}`, configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function CreateTable(amountOfPeople, tableNr){
    return axios.post(`localhost:8080/happ/table`, {
        "amountOfPeople" : amountOfPeople,
        "tableNr" : tableNr,
    }, configuration)
        .then(res => {
            console.log(res)
            return res.status
        })
        .catch(err => {
            console.log(err)
            console.log(err.return.status)
            return err.response.status
        })
}