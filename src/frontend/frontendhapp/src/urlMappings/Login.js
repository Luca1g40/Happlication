import axios from "axios";
import {configuration} from "./JwtHeader";

export function loginRequest(password){
    return axios.post(`http://localhost:8080/authenticate`, {
        "password": password
    })
        .then(res => {
            const id = res.data.staffId
            sessionStorage.setItem("Authorization", "Bearer " + res.data.jwt)
            sessionStorage.setItem("staffId", id)

            axios.get(`http://localhost:8080/happ/staff/${id}`, configuration)
                .then(res => {
                    console.log(res)
                    sessionStorage.setItem("rights", res.data.rights)
                })
                .catch(err => console.log(err))
            return res.status
        })
        .catch(err => {
            console.log(err)
        })
}

//Checks if status of ALL responses is 403
//If true then redirect user to proper error page
(async () => {

    axios.interceptors.response.use(response => response, error => {
        if (error.response.status === 403) {
            // redirect to 403 page
            window.location = '/error403'
        }
    });
})();

function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}