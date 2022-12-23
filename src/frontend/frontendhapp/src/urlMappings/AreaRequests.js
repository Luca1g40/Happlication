import axios from "axios";
import {configuration} from "./JwtHeader";

export function createArea(name) {
    return axios.post(`http://localhost:8080/happ/area`, {
        "name" : name
    }, configuration)
        .then(res => {
            console.log(res)
            return res.status;
        })
        .catch(err => {
            console.log(err)
            return err.response.status;
        });
}

export function getArea(id) {
    return axios.get(`http://localhost:8080/happ/area/${id}`, configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}

export function getAllAreas() {
    return axios.get(`http://localhost:8080/happ/area/allareas`, configuration)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        });
}

export function deleteAreaItem(id){
    return axios.delete(`http://localhost:8080/happ/area/${id}`, configuration)
        .then(res => {
            console.log(res)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function addStaffToArea(staffId, areaId) {
    return axios.post(`http://localhost:8080/happ/staff/${staffId}/area`, {
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