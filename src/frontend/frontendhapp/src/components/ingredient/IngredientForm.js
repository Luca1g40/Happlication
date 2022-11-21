import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React from "react";


export default function IngredientForm(props){
    return(props.ingredient===undefined) ? (
        <div className={"crud-form"}>
            <label className={"left-column"} htmlFor={"name"}>Name: </label>
            <input className={"right-column"} name={"name"} onChange={(event)=>props.handleChange(event)}/>
            <ErrormeldingLabel text={props.errorMeldingText}/>

        </div>

    ) : (
        <div className={"crud-form"}>
            <label className={"left-column"} htmlFor={"name"}>Name: </label>
            <input className={"right-column"} name={"name"} disabled={props.disabled} onChange={(event)=>props.handleChange(event)} value={props.ingredient.name}/>
            <ErrormeldingLabel text={props.errorMeldingText}/>
        </div>

    )
}