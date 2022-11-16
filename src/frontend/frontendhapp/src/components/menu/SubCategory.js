import MenuItem from "./MenuItem";
import React from "react";
import {showCategory} from "../utils/Util";

export default function SubCategory (props){

    function showProductBasedOnCategory(category){
        return props.products.filter(product => {
                return product.productCategory === category;
            }
        )
    }

    return (showProductBasedOnCategory(props.category).length > 0) ? (
        <div className={"subcategory-div"}>
            <h3>{showCategory(props.category)}</h3>
                {
                    showProductBasedOnCategory(props.category).map(product => {
                        return <MenuItem key={product.id} product={product}/>
                    }
                )}
        </div>
    ) : ""
}