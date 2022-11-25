import ErrorLabel from "../utils/ErrormeldingLabel";
import React from "react";

export default function MenuCategoryForm(props){
    return(props.category===undefined) ? (
        <div className={"crud-form"}>
            <label className={"left-column"} htmlFor={"name"}>Name: </label>
            <input className={"right-column"} name={"name"} onChange={(event)=>props.handleChange(event)}/>
            <ErrorLabel text={props.errorMeldingText}/>
        </div>

    ) : (
        <div className={"crud-form"}>
            <label className={"left-column"} htmlFor={"name"}>Name: </label>
            <input className={"right-column"} name={"name"} disabled={props.disabled} onChange={(event)=>props.handleChange(event)} value={props.category.name}/>
            <ErrorLabel text={props.errorMeldingText}/>
        </div>

    )
}