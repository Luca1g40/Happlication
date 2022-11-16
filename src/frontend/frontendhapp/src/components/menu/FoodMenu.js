import React, {useEffect, useRef, useState} from "react";
import {getMenuFoodItems} from "../../urlMappings/MenuRequests";
import "../menu/SubCategory"
import SubCategory from "./SubCategory";

function FoodMenu() {
    const [products, setProducts] = useState([]);
    const ref = useRef();

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
                <SubCategory products={products} category={"STARTER"}/>
                <SubCategory products={products} category={"MAIN_COURSE"}/>
                <SubCategory products={products} category={"SIDE"}/>

            </ul>
        </div>
    )
}

export default FoodMenu