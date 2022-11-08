import React, {useRef, useEffect, useState} from "react";
import {getAllIngredients} from "../../urlMappings/MenuRequests";
import ErrormeldingLabel from "../ErrormeldingLabel";
import SubmitButton from "../submitData/SubmitButton";
import "../../styles/MenuCrudForm.css"
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
        <>
            <div className={"crud-menu-container"}>
                <h1>Title</h1>
                <div className={"crud-form"}>
                    <label className={"left-column"} htmlFor="product-destination">Product destinaion: </label>
                    <select className={"right-column"} name={"product-destination"} onChange={handleChange}>
                        <option value={"BAR_PRODUCT"} >Bar</option>
                        <option value={"BAR_PRODUCT"} >Kitchen</option>
                    </select>

                    <div>
                        <label className={"left-column"} htmlFor="product-name">Product name:</label>
                        <input className={"right-column"} name={"product-name"} placeholder={""} onChange={handleChange}/>
                    </div>

                    <div>
                        <label className={"left-column"} htmlFor="product-category">Product category</label>
                         <select className={"right-column"} name={"product-category"} onChange={handleChange}>
                            <option value={"DRINKS"} >Drinks</option>
                            <option value={"EXTRA"} >Extra</option>
                             <option value={"DESSERT"} >Dessert</option>
                             <option value={"SIDE"} >Side</option>
                             <option value={"STARTER"} >Starter</option>
                             <option value={"MAIN_COURSE"} >Main course</option>
                        </select>
                    </div>

                    <div>
                        <label className={"left-column"} htmlFor="product-price">Product prize</label>
                        <input className={"right-column"} type={"number"} name={"product-price"} min={0}  onChange={handleChange}/>
                    </div>

                    <div className={"add-ingredient-div"}>
                        <label className={"left-column"} htmlFor="product-ingredients-dropdown">Product ingredients toevoegen</label>
                        <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} onChange={handleChange}>
                            {ingredientList.map(ingredient =>{
                               return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                            })
                            }
                        </select>
                        <button className={"add-ingredient-button"} onClick={()=>addIngredient(ref.current.value)}>Add ingredient</button>
                    </div>
                    <label className={"left-column"} htmlFor="product-ingredients">Product ingredients</label>

                    <div className={"ingredient-filter left-column"}>
                        {toegevoegdeIngredienten.map((ingredient,i)=>{
                            return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} onClick={()=>removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                        })}
                    </div>

                    <div className={"error-label"}>
                        <ErrormeldingLabel text={errorMeldingText}/>
                    </div>

                    <div>
                        <label className={"left-column"} htmlFor="product-details">Product details:</label>
                        <textarea className={"right-column details-text"} name={"product-details"} placeholder={"enter text..."}  onChange={handleChange}/>
                    </div>

                </div>
                <div className={"create-button"}>
                    <SubmitButton action={Actions.CREATE_PRODUCT} inputs={inputs} ingredientList={toegevoegdeIngredienten} buttonText={"Create Product"}/>
                </div>
            </div>


        </>
    )




}