import React, {useEffect, useState} from "react";
import {getMenuDrinkItems} from "../../urlMappings/MenuRequests";
import SubCategory from "./SubCategory";


function DrinksMenu() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getMenuDrinkItems()
            .then(res =>
                setProducts(res)
            )
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className={"listDiv"}>
            <ul className={"list"}>
                <h1>Dranken</h1>
                <SubCategory products={products} category={"DRINKS"}/>
                <SubCategory products={products} category={"FRIS_DRANKEN"}/>
                <SubCategory products={products} category={"WARME_DRANKEN"}/>
                <SubCategory products={products} category={"WARME_DRANKEN"}/>
                <SubCategory products={products} category={"WARME_DRANKEN"}/>


            </ul>
        </div>
    )
}

export default DrinksMenu
