import axios from "axios";
import {configuration} from "./JwtHeader";

const staffId = sessionStorage.getItem("staffId");

export function claimSelectedOrders(orderIds) {
    return axios.post(`http://localhost:8080/happ/staff/${staffId}/claim`, {
        "selectedOrders": orderIds
    }, configuration)
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getAllStaffMembers() {
    return axios.get("http://localhost:8080/happ/staff/findallstaff", configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function DeleteStaff(staffIdForDelete) {
    return axios.delete(`http://localhost:8080/happ/staff/${staffIdForDelete}`, configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}
