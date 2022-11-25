import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React from "react";

export default function ProductCategoryForm(props){
    return(props.category===undefined) ? (
        <>
            <ErrormeldingLabel text={props.errorMeldingText}/>
            <label htmlFor={"name"}>Name: </label>
            <input name={"name"} onChange={(event)=>props.handleChange(event)}/>
        </>

    ) : (
        <>
            <ErrormeldingLabel text={props.errorMeldingText}/>
            <label htmlFor={"name"}>Name: </label>
            <input name={"name"} disabled={props.disabled} onChange={(event)=>props.handleChange(event)} value={props.category.name}/>
        </>

    )
}