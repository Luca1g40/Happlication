import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React, {useEffect, useRef, useState} from "react";
import {getAllIngredients} from "../../urlMappings/MenuRequests";

export default function ProductForm(props){

    const ref = useRef(null);
    const[ingredientList,setIngredientList] = useState([])

    useEffect(() => {
        getAllIngredients()
            .then(res => {
                console.log(res)
                setIngredientList(res);

            })
            .catch(err => {
                console.log(err)
            })
    },[])


    return (props.product===undefined) ? (
        <>
            <h1>Create product</h1>
            <div className={"crud-form"} >
                <label className={"left-column"} htmlFor="destination">Product destination: </label>
                <select className={"right-column"} name={"destination"} onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <div>
                    <label className={"left-column"} htmlFor="name">Product name:</label>
                    <input className={"right-column"} name={"name"} placeholder={""} onChange={(event)=>props.handleChange(event)}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="category">Product category</label>
                    <select className={"right-column"} name={"category"} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"EXTRA"} >Extra</option>
                        <option value={"DESSERT"} >Dessert</option>
                        <option value={"SIDE"} >Side</option>
                        <option value={"STARTER"} >Starter</option>
                        <option value={"MAIN_COURSE"} >Main course</option>
                    </select>
                </div>


                <div>
                    <label className={"left-column"} htmlFor="price">Product prize</label>
                    <input className={"right-column"} type={"number"} name={"price"} min={0}  onChange={(event)=>props.handleChange(event)}/>
                </div>


                <div className={"add-ingredient-div"}>
                    <label className={"left-column"} htmlFor="product-ingredients-dropdown">Product ingredients toevoegen</label>
                    <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} >
                        {ingredientList.map(ingredient =>{
                            return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                        })
                        }
                    </select>
                    <button className={"add-ingredient-button"} onClick={()=>props.addIngredient(ref.current.value)}>Add ingredient</button>
                </div>

                <label className={"left-column"} htmlFor="product-ingredients">Product ingredients</label>

                <div className={"ingredient-filter left-column"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}
                </div>


                <div className={"error-label"}>
                    <ErrormeldingLabel text={props.errorMeldingText}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="details">Product details:</label>
                    <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."}  onChange={props.handleChange}/>
                </div>
            </div>
        </>
    ) : (
        <>
            <h1>Edit product</h1>
            <div className={"crud-form"} ref={ref}>
                <label className={"left-column"} htmlFor="productDestination">Product destination: </label>
                <select className={"right-column"} name={"productDestination"}
                        disabled={props.disabled} value={props.product.productDestination}
                        onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <div>
                    <label className={"left-column"} htmlFor="name">Product name:</label>
                    <input className={"right-column"} name={"name"} placeholder={""} disabled={props.disabled} value={props.product.name} onChange={(event)=>props.handleChange(event)}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="productCategory">Product category</label>
                    <select className={"right-column"} name={"productCategory"} disabled={props.disabled}
                            value={props.product.productCategory} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"EXTRA"} >Extra</option>
                        <option value={"DESSERT"} >Dessert</option>
                        <option value={"SIDE"} >Side</option>
                        <option value={"STARTER"} >Starter</option>
                        <option value={"MAIN_COURSE"} >Main course</option>
                    </select>
                </div>


                <div>
                    <label className={"left-column"} htmlFor="price">Product prize</label>
                    <input className={"right-column"} type={"number"} name={"price"} min={0} disabled={props.disabled} value={props.product.price} onChange={(event)=>props.handleChange(event)}/>
                </div>


                <div className={"add-ingredient-div"}>
                    <label className={"left-column"} htmlFor="product-ingredients-dropdown">Product ingredients toevoegen</label>
                    <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} disabled={props.disabled}>
                        {ingredientList.map(ingredient =>{
                            return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                        })
                        }
                    </select>
                    <button className={"add-ingredient-button"} onClick={()=>props.addIngredient(ref.current.value)} disabled={props.disabled}>Add ingredient</button>
                </div>

                <label className={"left-column"} htmlFor="product-ingredients">Product ingredients</label>

                <div className={"ingredient-filter left-column"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} disabled={props.disabled} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}
                </div>


                <div className={"error-label"}>
                    <ErrormeldingLabel text={props.errorMeldingText}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="details">Product details:</label>
                    <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."} value={props.product.details} disabled={props.disabled}  onChange={props.handleChange}/>
                </div>
            </div>

        </>
    );

}