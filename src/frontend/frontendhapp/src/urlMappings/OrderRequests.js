import axios from "axios";
import {configuration} from "./JwtHeader";


export function getPersonallyClaimedOrders() {
    const staffId = sessionStorage.getItem("name");

    return axios.get(`http://localhost:8080/happ/orders/staff/${staffId}`, configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function setOrderToDone(id) {
    return axios.post(`http://localhost:8080/happ/order/${id}`, {}, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getAllUnclaimedOrders() {
    return axios.get("http://localhost:8080/happ/orders", configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}