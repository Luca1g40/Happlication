import React, {useEffect, useRef, useState} from "react";
import {getMenuFoodItems} from "../../urlMappings/MenuRequests";
import "../menu/SubCategory"
import SubCategory from "./SubCategory";
import Menu from "./Menu";
import {showCategory} from "../utils/Util";

function FoodMenu() {
    const [products, setProducts] = useState([]);
    const Voorgerechten = useRef();
    const Hoofdgerechten = useRef();
    const Bijgerechten = useRef();

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
        console.log(sortedUniqueProductCategories)
        return sortedUniqueProductCategories.sort()
    }

    function scrollToElement(ref){
        console.log(ref)
        ref.current.scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <>
            <div className={"scrollable-buttons"}> {
               getUniqueProductCategories(products).map((category, i) => {
                    return <button key={i} className={"button menu-nav"} onClick={() => scrollToElement(Voorgerechten)}>{category}</button>
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