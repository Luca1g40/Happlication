import SubCategory from "./SubCategory";
import React from "react";


export default function Menu (props){



    return (

        <div className={"listDiv"}>
            <ul className={"list"}>
                <h1>{props.category}</h1>
                {
                    props.subCategories.map(subCategorie =>{
                        return <SubCategory products={props.products} category={subCategorie}/>

                    })
                }

            </ul>
        </div>
    )
}