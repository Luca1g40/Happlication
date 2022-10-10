import React, {useEffect, useState} from "react";
import axios from "axios";
import Popup from "./Popup";


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
        <div className={"listDiv"}>
            <ul className={"list"}>
                <h1>Fris dranken</h1>
                {
                    products.map(product =>
                        <div className="listItemDiv">
                            <li key={product.id} className={"listItem"} onClick={() => {
                                setButtonPopup(true);
                            }}>
                                <Popup trigger={buttonPopup}
                                       setTrigger={setButtonPopup}> {product.name} {product.price} </Popup>
                                <span className={"productSpan"}> {product.name}</span>
                                <span>€</span>
                                <span className={"productSpanPrice"}> {product.price}.-</span>
                            </li>
                        </div>
                    )
                }
            </ul>
        </div>
    )
}

export default DrinksDataFetching
