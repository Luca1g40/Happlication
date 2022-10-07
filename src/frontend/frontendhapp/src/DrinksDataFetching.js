import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from "./Component/Popup";

function DrinksDataFetching() {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/happ/product/drinks")
            .then(res => {
                console.log(res)
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className={"drinkListDiv"}>
            <ul className={"drinkList"}>
                {
                    products.map(product =>
                        <li key={product.id} className={"listDiv"} onClick={() => {setButtonPopup(true); console.log(product.id)}}>
                            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}> {product.name} {product.price} </Popup>
                            <span className={"productSpan"}> {product.name}</span>
                            <span>€</span>
                            <span className={"productSpanPrice"}> {product.price}.-</span>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default DrinksDataFetching
