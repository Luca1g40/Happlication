import React, {useEffect, useState} from "react";
import axios from "axios";
import Popup from "./Popup";
import ItemRegel from "./itemRegel";
// import from "../styles/Shoppingcart.css"


function FoodsDataFetching() {
    const [buttonPopup, setButtonPopup] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/happ/product/food")
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
                <h1>Gerechten</h1>
                {
                    products.map((product, i) =>


                        <ItemRegel key={product.id} product={product} />
                    )
                }
            </ul>
            <button className={"shoppingcartIcon"}>shooo</button>
        </div>
    )


}

export default FoodsDataFetching