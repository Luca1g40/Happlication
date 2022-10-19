import React, {useEffect, useState} from "react";
import MenuItem from "./MenuItem";
import {getMenuDrinkItems} from "../urlMappings/MenuRequests";


function DrinksMenu() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getMenuDrinkItems()
            .then(res =>
                setProducts(res.data)
            )
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className={"listDiv"}>
            <ul className={"list"}>
                <h1>Frisdranken</h1>
                {
                    products.map(
                        (product) =>
                            <MenuItem product={product}/>
                    )
                }
            </ul>
        </div>
    )
}

export default DrinksMenu
