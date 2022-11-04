import React, {useRef, useEffect, useState} from "react";
import {getAllIngredients} from "../../urlMappings/MenuRequests";
import ErrormeldingLabel from "../ErrormeldingLabel";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";



export default function ProductCRUD(props){
    const [editing,setEditing] = useState(false)
    const [toegevoegdeIngredienten,setToegevoegdeIngredienten] = useState([])
    const [ingredientList,setIngredientList] = useState([])
    const ref = useRef(null);
    const [errorMeldingText,setErrorMeldingText] = useState("");
    const [inputs,setInputs] = useState({})


    //private List<Ingredient> ingredients;
    useEffect(() => {
        console.log("rerender")
        getAllIngredients()
            .then(res => {
                console.log(res)
             setIngredientList(res);
            })
            .catch(err => {
                console.log(err)
            })
    },[])


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const addIngredient = (newIngredient) => {
        if (!(toegevoegdeIngredienten.includes(newIngredient))){
            setToegevoegdeIngredienten(state => [...state, newIngredient])

            setErrorMeldingText("");
        }else{
            setErrorMeldingText("kijk goed wat je doet ezel.")
        }

    }

    function removeFromIngredientsList(target){
        setToegevoegdeIngredienten(toegevoegdeIngredienten.filter(ingredient=>{
            return ingredient!==target
        }))
        setErrorMeldingText("");
    }

    return(
        <div>
            <h1>Title</h1>
            <span>
                <div>
                    <label htmlFor="product-name">Product name:</label>
                    <input name={"product-name"} placeholder={""} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="product-category">Product category</label>
                     <select name={"product-category"} onChange={handleChange}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"EXTRA"} >Extra</option>
                         <option value={"DESSERT"} >Dessert</option>
                         <option value={"SIDE"} >Side</option>
                         <option value={"STARTER"} >Starter</option>
                         <option value={"MAIN_COURSE"} >Main course</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="product-price">Product prize</label>
                    <input type={"number"} name={"product-price"} min={0} placeholder={"yoooo"}  onChange={handleChange}/>
                </div>


            </span>
            <span>
                <label htmlFor="product-ingredients">Product ingredients</label>
                <div className={"ingredient-filter"}>
                    {toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} onClick={()=>removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}

                </div>

                <label htmlFor="product-ingredients-dropdown">Product ingredients toevoegen</label>
                <select ref={ref} name={"product-ingredients-dropdown"} onChange={handleChange}>
                    {ingredientList.map(ingredient =>{
                       return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                    })
                    }
                </select>
                <button onClick={()=>addIngredient(ref.current.value)}>Add ingredient</button>
                <ErrormeldingLabel text={errorMeldingText}/>
                    <div>
                        <label htmlFor="product-details">Product details:</label>
                        <textarea name={"product-details"} placeholder={"ohmmmm"}  onChange={handleChange}/>
                    </div>


                    <label htmlFor="product-destination">Product destinaion: </label>
                    <select name={"product-destination"} onChange={handleChange}>
                        <option value={"BAR_PRODUCT"} >Bar</option>
                        <option value={"BAR_PRODUCT"} >Kitchen</option>
                    </select>


            </span>

            <SubmitButton action={Actions.CREATE_PRODUCT} inputs={inputs} ingredientList={toegevoegdeIngredienten} buttonText={"Create Product"}/>
        </div>
    )




}