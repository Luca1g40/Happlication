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

export function GetTableByNumber(tableNumber){
    return axios.get(`http://localhost:8080/happ/tablenumber/${tableNumber}`,configuration)
        .then(res => {
            console.log(res)
            return res.data;
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

    return axios.get("http://localhost:8080/happ/table/findalltable", configuration)

        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}


export function DeleteTable(tableIdForDelete) {
    return axios.delete(`http://localhost:8080/happ/table/${tableIdForDelete}`, configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
}

export function klantIsGeholpen(tafelId){
    axios.put(`http://localhost:8080/happ/table/${tafelId}/helpNodig`, {//todo->tafelId moet zelf opgehaald worden
        "setHulpBool" : "false"
    })
        .then(res => {
            console.log(res)

        })
        .catch(err => {
            console.log(err)
        })
}


export function CreateTable(amountOfPeople, tableNr){
    return axios.post(`http://localhost:8080/happ/table`, {
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

export function addTableToArea(tableId, areaId) {
    return axios.post(`http://localhost:8080/happ/table/${tableId}/area`, {
        "id": areaId
    }, configuration)
        .then(res => {
            console.log(res);
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}
export function KlantHeeftHulpNodig(tafelId){
    axios.put(`http://localhost:8080/happ/table/${tafelId}/helpNodig`, {
        "setHulpBool" : "true"
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export function setTimeAndStatus(tafelId, timeOfLogin){
    axios.put(`http://localhost:8080/happ/table/tablestatus/${tafelId}`, {
        "timeOfLogin" : timeOfLogin
    })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

export function GetTimeOfLogin(tafelId) {
    return axios.get(`http://localhost:8080/happ/table/logintime/${tafelId}`)
        .then(res => {
            return res.data;
        })
}


