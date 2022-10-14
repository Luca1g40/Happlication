import axios from "axios";


export  function AddProductToShoppingCart(tableId,productId,amount){
    axios.post(`http://localhost:8080/happ/table/${tableId}/shoppingcart`,{
        "id" : productId,
        "amount": amount
    })
        .then(res => {
            console.log(res)
            return res;
            })
        .catch(err => {
            console.log(err)
        })

}

export  function PlaceOrder(tableId){
    axios.post(`http://localhost:8080/happ/table/${tableId}/order`)
        .then(res => {
            console.log(res)
            return res;
            })
        .catch(err => {
            console.log(err)
        })

}

