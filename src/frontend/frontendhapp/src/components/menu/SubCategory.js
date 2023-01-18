import MenuItem from "./MenuItem";
import React from "react";

export default function SubCategory (props){

    return (props.products.length > 0) ? (
        <div className={"subcategory-div"} id={props.id}ref={props.ref}>
            <h3>{props.category}</h3>
                {
                    props.products.map(product => {
                        return <MenuItem key={product.id} product={product}/>
                    }
                )}
        </div>
    ) : ""
}