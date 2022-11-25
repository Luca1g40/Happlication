import React, {useEffect, useRef, useState} from "react";
import {getMenuFoodItems} from "../../urlMappings/MenuRequests";
import "../menu/SubCategory"
import Menu from "./Menu";

function FoodMenu() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        getMenuFoodItems()
            .then(res =>  {
                setProducts(res)
                }
            )
            .catch(err =>
                console.log(err)
            )
    }, [])


    function getUniqueProductCategories(products){
        let productCategories = products.map(product => {return product.productCategoryData.name})
        const uniqueProductCategories = productCategories.filter((x, i, a) => a.indexOf(x) === i)
        let sortedUniqueProductCategories = uniqueProductCategories.map(category => {return category})
        return sortedUniqueProductCategories.sort()
    }

    return (
        <>
            <div className={"scrollable-buttons"}> {
               getUniqueProductCategories(products).map((category, i) => {
                    return <button key={i} className={"button menu-nav"}>{category}</button>
                })
            }
            </div>
            <div className={"list-wrapper"}>
                <ul className={"list"}>
                    <h1>Gerechten</h1>
                    <Menu products={products} subCategories={getUniqueProductCategories(products)}/>
                </ul>
            </div>
        </>
    )
}

export default FoodMenu