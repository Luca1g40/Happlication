import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React from "react";


export default function IngredientForm(props){
    return(props.ingredient===undefined) ? (
        <div>
            <ErrormeldingLabel text={props.errorMeldingText}/>
            <label htmlFor={"name"}>Name: </label>
            <input name={"name"} onChange={(event)=>props.handleChange(event)}/>
        </div>

    ) : (
        <div>
            <ErrormeldingLabel text={props.errorMeldingText}/>
            <label htmlFor={"name"}>Name: </label>
            <input name={"name"} disabled={props.disabled} onChange={(event)=>props.handleChange(event)} value={props.ingredient.name}/>
        </div>

    )
}