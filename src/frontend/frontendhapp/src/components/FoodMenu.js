import React, {useEffect, useState} from "react";
import MenuItem from "./MenuItem";
import {getMenuFoodItems} from "../urlMappings/MenuRequests";
import {Link} from "react-router-dom";



function FoodMenu() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getMenuFoodItems()
            .then(res =>
                setProducts(res)
            )
            .catch(err =>
                console.log(err)
            )
    }, [])

    return (
        <div className={"listDiv"}>
            <ul className={"list"}>
                <h1>Gerechten</h1>
                {
                    products.map((product, i) =>
                        <MenuItem key={product.id} product={product}/>
                    )
                }
            </ul>
        </div>
    )
}

export default FoodMenu