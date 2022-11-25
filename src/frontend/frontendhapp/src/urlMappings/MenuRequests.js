import axios from "axios";
import {configuration} from "./JwtHeader";


export function getMenuFoodItems() {
    return axios.get("http://localhost:8080/happ/products/foods", configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getCategoryById(id) {
    return axios.get(`http://localhost:8080/happ/productcategory/${id}`, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getAllCategories() {
    return axios.get(`http://localhost:8080/happ/productcategory/all`, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function createCategory(name) {
    return axios.post(`http://localhost:8080/happ/productcategory`, {
        "name":name
    },configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}

export function getMenuDrinkItems() {
    return axios.get("http://localhost:8080/happ/products/drinks", configuration)
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
export function getIngredient(id){
    return axios.get(`http://localhost:8080/happ/ingredient/${id}`, configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}
export function createIngredient(name){
    return axios.post("http://localhost:8080/happ/ingredient",{
        "name":name,
        "amount": 1
    }, configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export function editIngredient(id,name){
    return axios.put(`http://localhost:8080/happ/ingredient/${id}`,{
        "name":name,
        "amount": 1
    }, configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
        console.log(err)
    })
}

function saveImage(imageFile){
   return  axios.post(`http://localhost:8080/happ/image`, {
        test_file:imageFile
    },{
        headers: {
            "Content-Type": "multipart/form-data", Authorization: sessionStorage.getItem("Authorization")
        }})
        .then(res => {
           console.log(res.data)
            // imagePath.concat(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}
export async function createProduct(productName, productIngredients, productDestination, productCategory, details, price, productType, imageFile) {
    console.log(productCategory)
    var fftesten = 0

    await saveImage(imageFile).then(res => {
        fftesten = res
    })

    let imagePath = fftesten
    console.log(imagePath)

    return axios.post(`http://localhost:8080/happ/product`, {
        "name":productName,
        "productCategoryName":productCategory,
        "price": price,
        "productType":productType,
        "ingredients": productIngredients,
        "details":details,
        "productDestination":productDestination,
        "imagePath":imagePath
    }, configuration)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
}


export function getAllProducts(){
    return axios.get(`http://localhost:8080/happ/product/findall`, configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export function deleteProduct(id){
    return axios.delete(`http://localhost:8080/happ/product/${id}`, configuration)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export function getProduct(id){
    return axios.get(`http://localhost:8080/happ/product/${id}`, configuration)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err)
        })
}

export function editProduct(id,name,destination,ingredienten,price,details,category){
    return axios.put(`http://localhost:8080/happ/product/${id}`, {
        "name":name,
        "productCategory":category,
        "price":price,
        "ingredients":ingredienten,
        "details":details,
        "productDestination":destination
    },configuration)
    .then(res => {
        return res.data;
    })
        .catch(err => {
            console.log(err)
        })
}
