import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React, {useEffect, useRef, useState} from "react";
import {getAllCategories, getAllIngredients} from "../../urlMappings/MenuRequests";

export default function ProductForm(props){

    const ref = useRef(null);
    const[ingredientList,setIngredientList] = useState([])
    const[allCategories,setallCategories] = useState([])

    // TODO give subcategory starting value
    useEffect(() => {
        getAllCategories()
            .then(res => {
               setallCategories(res)

            })
            .catch(err => {
                console.log(err)
            })
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
                <label className={"left-column"} htmlFor="destination">Destination: </label>
                <select className={"right-column"} name={"destination"} onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                    <label className={"left-column"} htmlFor="name">Name:</label>
                    <input className={"right-column"} name={"name"} placeholder={""} onChange={(event)=>props.handleChange(event)}/>

                    <label className={"left-column"} htmlFor="type">Category:</label>
                    <select className={"right-column"} name={"type"} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"FOOD"} >Food</option>
                    </select>


                    <label className={"left-column"} htmlFor="subcategory">Sub category:</label>
                    <select className={"right-column"} name={"subcategory"} onChange={(event)=>props.handleChange(event)}>
                        {allCategories.map(category => {
                            return <option key={category.id.id} value={category.name}> {category.name}</option>
                        })}
                    </select>

                    <label className={"left-column"} htmlFor="price">Prize:</label>
                    <input className={"right-column"} type={"number"} name={"price"} min={0}  onChange={(event)=>props.handleChange(event)}/>



                <div className={"add-ingredient-div"}>
                    <label className={"left-column"} htmlFor="product-ingredients-dropdown">Add ingredients</label>
                    <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} >
                        {ingredientList.map(ingredient =>{
                            return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                        })
                        }
                    </select>
                    <button className={"add-ingredient-button"} onClick={()=>props.addIngredient(ref.current.value)}>Add ingredient:</button>
                </div>

                <label className={"left-column"} htmlFor="product-ingredients">Ingredients:</label>

                <div className={"ingredient-filter left-column"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}
                </div>


                <div className={"error-label"}>
                    <ErrormeldingLabel text={props.errorMeldingText}/>
                </div>

                    <label className={"left-column"} htmlFor="details">Product details:</label>
                    <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."}  onChange={props.handleChange}/>

            </div>
        </>

    ) : (
        <>
            <h1>Edit product</h1>
            <div className={"crud-form"} ref={ref}>
                <label className={"left-column"} htmlFor="productDestination">Destination: </label>
                <select className={"right-column"} name={"productDestination"}
                        disabled={props.disabled} value={props.product.productDestination}
                        onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <label className={"left-column"} htmlFor="name">Name:</label>
                <input className={"right-column"} name={"name"} placeholder={""} disabled={props.disabled} value={props.product.name} onChange={(event)=>props.handleChange(event)}/>

                <label className={"left-column"} htmlFor="subcategory">Sub category:</label>
                <select className={"right-column"} name={"subcategory"} onChange={(event)=>props.handleChange(event)}>
                    {allCategories.map(category=>{
                        return <option key={category.id.id} value={category.name}> {category.name}</option>
                    })}
                </select>


                <label className={"left-column"} htmlFor="price">Prize:</label>
                <input className={"right-column"} type={"number"} name={"price"} min={0} disabled={props.disabled} value={props.product.price} onChange={(event)=>props.handleChange(event)}/>


                <div className={"add-ingredient-div"}>
                    <label className={"left-column"} htmlFor="product-ingredients-dropdown">Add ingredients</label>
                    <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} disabled={props.disabled}>
                        {ingredientList.map(ingredient =>{
                            return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                        })
                        }
                    </select>
                    <button className={"add-ingredient-button"} onClick={()=>props.addIngredient(ref.current.value)} disabled={props.disabled}>Add ingredient:</button>
                </div>

                <label className={"left-column"} htmlFor="product-ingredients">Ingredients</label>

                <div className={"ingredient-filter left-column"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} disabled={props.disabled} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}
                </div>


                <div className={"error-label"}>
                    <ErrormeldingLabel text={props.errorMeldingText}/>
                </div>

                <label className={"left-column"} htmlFor="details">Product details:</label>
                <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."} value={props.product.details} disabled={props.disabled}  onChange={props.handleChange}/>

            </div>

        </>
    );

}