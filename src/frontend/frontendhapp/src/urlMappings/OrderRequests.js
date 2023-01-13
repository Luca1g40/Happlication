import axios from "axios";
import {configuration} from "./JwtHeader";

const staffId = sessionStorage.getItem("staffId");
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
            console.log(staffId)
            return res.data
        })
        .catch(err => {
            console.log(staffId)
            console.log(err)
        })
}

export function getAllOrders() {

    return axios.get(`http://localhost:8080/happ/order/all`, configuration)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getAllOrdersOfToday() {
    return axios.get(`http://localhost:8080/happ/orders/today`, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}


export function getAllOrdersByDateRange(firstDate, secondDate) {

    return axios.get('http://localhost:8080/happ/order/bydate', {
        headers: {
            Authorization: sessionStorage.getItem("Authorization")
        },
        params: {
            firstDate: firstDate,
            secondDate: secondDate
        }
    }).then(res =>{
        console.log(res.data)
        return res.data
    })
}
