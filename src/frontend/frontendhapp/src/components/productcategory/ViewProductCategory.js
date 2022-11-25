import React, {useEffect, useState} from "react";
import {Actions} from "../submitData/Actions";
import {Link} from "react-router-dom";
import {useParams} from "react-router";
import {getCategoryById} from "../../urlMappings/MenuRequests";
import SubmitButton from "../submitData/SubmitButton";
import Logout from "../utils/Logout";
import HomeNav from "../utils/Homebutton";
import MenuCategoryForm from "./MenuCategoryForm";


export default function ViewProductCategory(){
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
        <>
            <h1>Create Menu category</h1>
            <div className={"home-button"}>
                <Link to="/administration" className="button search-products-navigation" >Home</Link>
            </div>
            <MenuCategoryForm errorMeldingText={foutMelding} handleChange={event=>handleChange(event)}/>
            <SubmitButton className={"button crud-form-submit"} setFoutMelding={foutMelding=>setFoutMelding(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.CREATE_CATEGORY} buttonText={"Create category"} category={category}/>
            <Logout/>
            <HomeNav/>
        </>
    ) : (
        <>
            <MenuCategoryForm errorMeldingText={foutMelding} disabled={disabled} category={category} handleChange={event=>handleChange(event)}/>
            <SubmitButton setFoutMelding={foutMelding=>setFoutMelding(foutMelding)} disabled={disabled} setDisabled={disabled=>setDisabled(disabled)} action={Actions.UPDATE_INGREDIENT} buttonText={"Update"}  category={category}/>
            <button onClick={()=>setDisabled(false)} disabled={!disabled}>Edit</button>
            <button onClick={()=>setDisabled(true)} disabled={disabled}>Cancel</button>
        </>


    )
}