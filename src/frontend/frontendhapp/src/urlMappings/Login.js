import axios from "axios";
import {configuration} from "./JwtHeader";

export function loginRequest(password){
    axios.post(`http://localhost:8080/authenticate`, {
        "username": 72,
        "password": password

    })
        .then(res => {
            const id = parseJwt(res.data.jwt).sub
            sessionStorage.setItem("Authorization", "Bearer " + res.data.jwt)
            sessionStorage.setItem("name", id)

            axios.get(`http://localhost:8080/happ/staff/${id}`, configuration)
                .then(res => {
                    console.log(res)
                    sessionStorage.setItem("rights", res.data.rights)
                })
                .catch(err => console.log(err))

        })
        .catch(err => {
            console.log(err)
        })
}

function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}