import ProductForm from "./ProductForm";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import React, {useEffect, useState} from "react";
import {getAllIngredients, getProduct} from "../../urlMappings/MenuRequests";


export default function ViewProductForm(props){
    const [disabled,setDisabled] = useState(true)
    const [inputs, setInputs] = useState({
        "product-category":"DRINKS",
        "product-destination":"BAR_PRODUCT"
    })
    const [errorMeldingText,setErrorMeldingText] = useState("");
    const [product,setProduct] = useState();
    const [toegevoegdeIngredienten,setToegevoegdeIngredienten] = useState([])

    useEffect(() => {
        console.log("rerender")
        getProduct(84)
            .then(res => {
                console.log(res)
                setProduct(res);
                setToegevoegdeIngredienten(res.ingredientList.map((ingredient)=>{return ingredient.name}))
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    //TODO remove border
    //TODO edit product backend
    const handleChange = (event) => {

        const name = event.target.name;

        const value = event.target.value;
        console.log(value)
        setInputs(values => ({...values, [name]: value}))
        setProduct(values => ({...values, [name]: value}))
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
            <ProductForm product={product} toegevoegdeIngredienten={toegevoegdeIngredienten} disabled={disabled} handleChange={event=>handleChange(event)} removeFromIngredientsList={(target=>removeFromIngredientsList(target))} setToegevoegdeIngredienten={(ingredient)=>setToegevoegdeIngredienten(ingredient)} addIngredient={ingredient=>addIngredient(ingredient)} errorMeldingText={errorMeldingText}/>
            <button onClick={()=>setDisabled(false)} disabled={!disabled}>Edit</button>
            <button onClick={()=>setDisabled(true)} disabled={disabled}>Cancel</button>

        </div>
    )
}