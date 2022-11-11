import ProductForm from "./ProductForm";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import React, {useEffect, useState} from "react";
import {getProduct} from "../../urlMappings/MenuRequests";
import {useParams} from "react-router";
import  "../../styles/MenuCrudForm.css"
import {Link} from "react-router-dom";


export default function ViewProductForm(props){
    const [disabled,setDisabled] = useState(true)

    const [errorMeldingText,setErrorMeldingText] = useState("");
    const [product,setProduct] = useState();
    const [toegevoegdeIngredienten,setToegevoegdeIngredienten] = useState([])
    const params = useParams();


    useEffect(() => {
        if (!(params.id===undefined)){
            getProduct(params.id)
                .then(res => {
                    console.log(res.id)
                    setProduct(res);
                    setToegevoegdeIngredienten(res.ingredientList.map((ingredient)=>{return ingredient.name}))
                })
        }else{
            setProduct({
                "category":"DRINKS",
                "destination":"BAR_PRODUCT"
            })
        }
    },[])



    //TODO remove border
    //TODO edit product backend
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
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

    return (params.id===undefined) ? (
        <div className="crud-menu-container">
            <Link to="/administration" className="createProductButton" >Home</Link>
            <Link to="/searchproduct" className="createProductButton" >Search a product</Link>

            <ProductForm toegevoegdeIngredienten={toegevoegdeIngredienten} disabled={disabled} handleChange={event=>handleChange(event)} removeFromIngredientsList={(target=>removeFromIngredientsList(target))} setAddedIngredients={(ingredient) => setToegevoegdeIngredienten(ingredient)} addIngredient={ingredient=>addIngredient(ingredient)} errorMeldingText={errorMeldingText}/>
            <div className={"create-button"}>
                <SubmitButton className={"submit-button button"} action={Actions.CREATE_PRODUCT} buttonText={"Create product"} setProduct={product=>setProduct(product)} product={product} ingredientList={toegevoegdeIngredienten} setFoutMelding={error => setErrorMeldingText(error)} />
            </div>

        </div>
    ) :(
        <div className="crud-menu-container">
            <Link to="/administration" className="createProductButton" >Home</Link>
            <Link to="/searchproduct" className="createProductButton" >Search a product</Link>
            <ProductForm product={product} toegevoegdeIngredienten={toegevoegdeIngredienten} disabled={disabled} handleChange={event=>handleChange(event)}
                         removeFromIngredientsList={(target=>removeFromIngredientsList(target))}
                         setToegevoegdeIngredienten={(ingredient)=>setToegevoegdeIngredienten(ingredient)}
                         addIngredient={ingredient=>addIngredient(ingredient)} errorMeldingText={errorMeldingText}/>
            <div className={"edit-buttons"}>
                <SubmitButton  className={"submit-button button"} setFoutMelding={foutMelding=>setErrorMeldingText(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.UPDATE_PRODUCT} buttonText={"Update"} product={product} ingredientList={toegevoegdeIngredienten}/>
                <div className={"left-buttons"}>
                    <button className={"edit-button button"} onClick={()=>setDisabled(false)} disabled={!disabled}>Edit</button>
                    <button className={"cancel-button button"} onClick={()=>setDisabled(true)} disabled={disabled}>Cancel</button>
                </div>
            </div>
        </div>
    )
}