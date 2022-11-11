import ErrormeldingLabel from "../ErrormeldingLabel";
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


            {/*{Object.keys(props.ingredient).map((key,i)=>{*/}
            {/*    if (!(key==="id")){*/}
            {/*        return <div key={i}>*/}
            {/*            <label htmlFor={key}>{key} </label>*/}
            {/*            <input name={key} disabled={props.disabled} onChange={(event)=>props.handleChange(event)} value={props.ingredient[key]}/>*/}
            {/*        </div>*/}
            {/*    }*/}

            {/*})}*/}

        </div>

    )
}