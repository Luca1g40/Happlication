import MenuItem from "./MenuItem";
import React from "react";
import {showCategory} from "../utils/Util";

export default function SubCategory (props){

    // function showProductBasedOnCategory(category){
    //     return props.products.filter(product => {
    //             return product.productCategory === category;
    //         }
    //     )
    // }

    return (props.products.length > 0) ? (
        <div className={"subcategory-div"} ref={props.ref}>
            <h3>{props.category}</h3>
                {
                    props.products.map(product => {
                        return <MenuItem key={product.id} product={product}/>
                    }
                )}
        </div>
    ) : ""
}