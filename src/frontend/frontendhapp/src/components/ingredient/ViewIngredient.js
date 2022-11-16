import IngredientForm from "./IngredientForm";
import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {getIngredient} from "../../urlMappings/MenuRequests";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import Logout from "../utils/Logout"
import HomeNav from "../utils/Homebutton"
import {Link} from "react-router-dom";


export default function ViewIngredient(props){
    const params = useParams();
    const [ingredient,setIngredient] = useState()
    const [disabled, setDisabled] = useState(false)
    const [foutMelding,setFoutMelding] = useState();

    useEffect(() => {
        if (!(params.id===undefined)){
            getIngredient(params.id)
                .then(res => {
                    setIngredient(res);
                    console.log(res)
                    setDisabled(true);
                })
                .catch(err => {

                })
        }
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(ingredient)
        setIngredient(values => ({...values, [name]: value}))
    }


    return (params.id === undefined) ? (
        <div>
            <h1>Create ingredient</h1>
            <div className={"home-button"}>
                <Link to="/administration" className="button search-products-navigation" >Home</Link>
            </div>
            <IngredientForm errorMeldingText={foutMelding} handleChange={event=>handleChange(event)}/>
            <SubmitButton setFoutMelding={foutMelding=>setFoutMelding(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.CREATE_INGREDIENT} buttonText={"Create ingredient"} ingredient={ingredient}/>
            <Logout/>
            <HomeNav/>
        </div>
) : (
        <div>
            <IngredientForm errorMeldingText={foutMelding} disabled={disabled} ingredient={ingredient} handleChange={event=>handleChange(event)}/>
            <SubmitButton setFoutMelding={foutMelding=>setFoutMelding(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.UPDATE_INGREDIENT} buttonText={"Update"}  ingredient={ingredient}/>
            <button onClick={()=>setDisabled(false)} disabled={!disabled}>Edit</button>
            <button onClick={()=>setDisabled(true)} disabled={disabled}>Cancel</button>
        </div>


    )
}