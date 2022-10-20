import React, {useEffect, useState} from "react";
import MenuItem from "./MenuItem";
import {getMenuFoodItems} from "../urlMappings/MenuRequests";
import returniets from "./Util";


function FoodMenu() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        let string = "kakaka"
        console.log(returniets(string))
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
            <button className={"shoppingcartIcon"}>shooo</button>
        </div>
    )
}

export default FoodMenu