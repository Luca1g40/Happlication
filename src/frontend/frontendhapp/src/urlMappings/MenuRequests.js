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
        })
        .catch(err => {
            console.log(err)
        })
}