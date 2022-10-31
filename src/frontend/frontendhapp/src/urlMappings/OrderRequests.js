import axios from "axios";
import {configuration} from "./JwtHeader";

const staffId = sessionStorage.getItem("name");
export function getPersonallyClaimedOrders() {

    return axios.get(`http://localhost:8080/happ/staff/${staffId}/myorders`, configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function setOrderToDone(orderId) {
    return axios.post(`http://localhost:8080/happ/order/${orderId}`, {}, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getAllUnclaimedOrders() {

    return axios.get(`http://localhost:8080/happ/staff/${staffId}/orders`, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log("catch")
            console.log(err)
        })
}