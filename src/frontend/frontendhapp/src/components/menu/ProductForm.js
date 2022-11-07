import ErrormeldingLabel from "../ErrormeldingLabel";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import React, {useEffect, useRef, useState} from "react";
import {getAllIngredients} from "../../urlMappings/MenuRequests";
import {ProductFormModes} from "./ProductFormModes";


export default function ProductForm(props){

    const ref = useRef(null);
    const[ingredientList,setIngredientList] = useState([])


    useEffect(() => {
        console.log("yoooo")
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
        <div>
            <h1>Title</h1>
            <span>
                <div>
                    <label htmlFor="name">Product name:</label>
                    <input name={"name"} placeholder={""} onChange={(event)=>props.handleChange(event)}/>
                </div>
                <div>
                    <label htmlFor="category">Product category</label>
                     <select name={"category"} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"EXTRA"} >Extra</option>
                         <option value={"DESSERT"} >Dessert</option>
                         <option value={"SIDE"} >Side</option>
                         <option value={"STARTER"} >Starter</option>
                         <option value={"MAIN_COURSE"} >Main course</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Product prize</label>
                    <input type={"number"} name={"price"} min={0} placeholder={"yoooo"}  onChange={(event)=>props.handleChange(event)}/>
                </div>


            </span>
            <span>
                <label htmlFor="product-ingredients">Product ingredients</label>
                <div className={"ingredient-filter"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}

                </div>

                <label htmlFor="product-ingredients-dropdown">Product ingredients toevoegen</label>
                <select ref={ref} name={"product-ingredients-dropdown"} >
                    {ingredientList.map(ingredient =>{
                        return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                    })
                    }
                </select>
                <button onClick={()=>props.addIngredient(ref.current.value)}>Add ingredient</button>
                <ErrormeldingLabel text={props.errorMeldingText}/>
                    <div>
                        <label htmlFor="details">Product details:</label>
                        <textarea name={"details"} placeholder={"ohmmmm"}  onChange={(event)=>props.handleChange(event)}/>
                    </div>


                    <label htmlFor="destination">Product destinaion: </label>
                    <select name={"destination"} onChange={(event)=>props.handleChange(event)}>
                        <option value={"BAR_PRODUCT"} >Bar</option>
                        <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                    </select>
            </span>

        </div>
    ) : (
        <div >
            <h1>Title</h1>
            <span>
                <div>
                    <label htmlFor="name">Product name:</label>
                    <input name={"name"} placeholder={""} disabled={props.disabled} value={props.product.name} onChange={(event)=>props.handleChange(event)}/>
                </div>
                <div>
                    <label htmlFor="productCategory">Product category</label>
                     <select name={"productCategory"} disabled={props.disabled} value={props.product.productCategory} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"EXTRA"} >Extra</option>
                         <option value={"DESSERT"} >Dessert</option>
                         <option value={"SIDE"} >Side</option>
                         <option value={"STARTER"} >Starter</option>
                         <option value={"MAIN_COURSE"} >Main course</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price">Product prize</label>
                    <input type={"number"} name={"price"} disabled={props.disabled} value={props.product.price} min={0} placeholder={"yoooo"}  onChange={(event)=>props.handleChange(event)}/>
                </div>


            </span>
            <span>
                <label htmlFor="product-ingredients">Product ingredients</label>
                <div className={"ingredient-filter"} >
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} disabled={props.disabled} key={i} className={"remove-ingredient-button"} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}

                </div>

                <label htmlFor="product-ingredients-dropdown">Product ingredients toevoegen</label>
                <select ref={ref} name={"product-ingredients-dropdown"} disabled={props.disabled}>
                    {ingredientList.map(ingredient =>{
                        return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                    })
                    }
                </select>
                <button onClick={()=>props.addIngredient(ref.current.value)} disabled={props.disabled}>Add ingredient</button>
                <ErrormeldingLabel text={props.errorMeldingText}/>
                    <div>
                        <label htmlFor="details">Product details:</label>
                        <textarea name={"details"} value={props.product.details} disabled={props.disabled} placeholder={"ohmmmm"}  onChange={(event)=>props.handleChange(event)}/>
                    </div>


                    <label htmlFor="productDestination">Product destinaion: </label>
                    <select name={"productDestination"} disabled={props.disabled} value={props.product.productDestination} onChange={(event)=>props.handleChange(event)}>
                        <option value={"BAR_PRODUCT"} >Bar</option>
                        <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                    </select>
            </span>

        </div>
    );

}