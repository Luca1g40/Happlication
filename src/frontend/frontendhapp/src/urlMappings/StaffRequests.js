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

