import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import IngredientForm from "../ingredient/IngredientForm";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import Logout from "../utils/Logout";
import HomeNav from "../utils/Homebutton";
import {useParams} from "react-router";
import {getCategoryById, getIngredient} from "../../urlMappings/MenuRequests";
import ProductCategoryForm from "./ProductCategoryForm";

export default function ViewProductCategory(props){
    const params = useParams();
    const [category,setCategory] = useState()
    const [disabled, setDisabled] = useState(false)
    const [foutMelding,setFoutMelding] = useState();


    useEffect(() => {
        if (!(params.id===undefined)){
            getCategoryById(params.id)
                .then(res => {
                    setCategory(res);
                    console.log(res)
                    setDisabled(true);
                })
        }
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setCategory(values => ({...values, [name]: value}))
    }

    return (params.id === undefined) ? (
        <div>
            <h1>Create Menu category</h1>
            <div className={"home-button"}>
                <Link to="/administration" className="button search-products-navigation" >Home</Link>
            </div>
            <ProductCategoryForm errorMeldingText={foutMelding} handleChange={event=>handleChange(event)}/>
            <SubmitButton className={"button submit-button"} setFoutMelding={foutMelding=>setFoutMelding(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.CREATE_CATEGORY} buttonText={"Create category"} category={category}/>
            <Logout/>
            <HomeNav/>
        </div>
    ) : (
        <div>
            <ProductCategoryForm errorMeldingText={foutMelding} disabled={disabled} category={category} handleChange={event=>handleChange(event)}/>
            <SubmitButton setFoutMelding={foutMelding=>setFoutMelding(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.UPDATE_INGREDIENT} buttonText={"Update"}  category={category}/>
            <button onClick={()=>setDisabled(false)} disabled={!disabled}>Edit</button>
            <button onClick={()=>setDisabled(true)} disabled={disabled}>Cancel</button>
        </div>


    )
}