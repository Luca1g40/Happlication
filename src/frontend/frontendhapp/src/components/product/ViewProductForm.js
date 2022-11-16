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
        console.log(name,value)
        setProduct(values => ({...values, [name]: value}))
        console.log(product)
    }

    const addIngredient = (newIngredient) => {

        if (!(toegevoegdeIngredienten.includes(newIngredient))){
            setToegevoegdeIngredienten(state => [...state, newIngredient])
            setErrorMeldingText("");
        }else{
            setErrorMeldingText("Er is iets fout gegaan")
        }

    }


    function removeFromIngredientsList(target){
        setToegevoegdeIngredienten(toegevoegdeIngredienten.filter(ingredient=>{
            return ingredient!==target
        }))
        setErrorMeldingText("");
    }

    function clearData() {
        sessionStorage.clear();
    }

    return (params.id===undefined) ? (
        <div>
            <div className={"home-button"}>
                <Link to="/administration" className="button products-navigation" >Home</Link>
            </div>

            <div className={"navigation-buttons"}>
                <Link to="/searchproduct" className="button" >Search a product</Link>
                <Link to="/staff" className="button products-navigation" onClick={() => {clearData()}}>Log out</Link>
            </div>

            <ProductForm toegevoegdeIngredienten={toegevoegdeIngredienten} disabled={disabled} handleChange={event=>handleChange(event)} removeFromIngredientsList={(target=>removeFromIngredientsList(target))} setAddedIngredients={(ingredient) => setToegevoegdeIngredienten(ingredient)} addIngredient={ingredient=>addIngredient(ingredient)} errorMeldingText={errorMeldingText}/>
            <div className={"create-button"}>
                <SubmitButton className={"submit-button button"} action={Actions.CREATE_PRODUCT} buttonText={"Create product"} setProduct={product=>setProduct(product)} product={product} ingredientList={toegevoegdeIngredienten} setFoutMelding={error => setErrorMeldingText(error)} />
            </div>
        </div>
    ) :(
        <div>
            <div className={"home-button"}>
                <Link to="/administration" className="button products-navigation" >Home</Link>
            </div>

            <div className={"navigation-buttons"}>
                <Link to="/searchproduct" className="button products-navigation" >Search a product</Link>
                <Link to="/staff" className="button products-navigation" onClick={() => {clearData()}}>Logout</Link>
            </div>

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