import axios from "axios";
import {configuration} from "./JwtHeader";


export function getMenuFoodItems() {
    return axios.get("http://localhost:8080/happ/product/food", configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getMenuDrinkItems() {
    return axios.get("http://localhost:8080/happ/product/drinks", configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}

//TODO implenteren
export function getAllIngredients(){
    return axios.get("http://localhost:8080/happ/ingredients", configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })

}


export function createProduct(productName,productIngredients,productDestination,productCategory,details,price){
    return axios.post(`http://localhost:8080/happ/product`, {
        "name":productName,
        "productCategory":productCategory,
        "price": price,
        "ingredients": productIngredients,
        "details":details,
        "productDestination":productDestination
    }, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}