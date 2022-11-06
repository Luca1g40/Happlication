import React, {useEffect, useState} from "react";
import ProductForm from "./ProductForm";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import {getAllIngredients} from "../../urlMappings/MenuRequests";




export default function CreateProductForm(props){
    const [editing,setEditing] = useState(false)
    const [inputs,setInputs] = useState({
        "product-category":"DRINKS",
        "product-destination":"BAR_PRODUCT"
    })
    const [errorMeldingText,setErrorMeldingText] = useState("");
    const [toegevoegdeIngredienten,setToegevoegdeIngredienten] = useState([])


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
            <ProductForm handleChange={event=>handleChange(event)} removeFromIngredientsList={(target=>removeFromIngredientsList(target))} toegevoegdeIngredienten={toegevoegdeIngredienten} setToegevoegdeIngredienten={(ingredient)=>setToegevoegdeIngredienten(ingredient)} addIngredient={ingredient=>addIngredient(ingredient)} errorMeldingText={errorMeldingText}/>
            <SubmitButton action={Actions.CREATE_PRODUCT} inputs={inputs} ingredientList={toegevoegdeIngredienten} buttonText={"Create Product"} setFoutMelding={foutmelding=>setErrorMeldingText(foutmelding)}/>
        </div>
    )




}