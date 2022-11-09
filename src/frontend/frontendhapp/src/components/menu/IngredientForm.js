


export default function IngredientForm(props){
    return(props.ingredient===undefined) ? (
        <div>
            <h1>true</h1>
            <label htmlFor={"name"}>Name: </label>
            <input name={"name"} onChange={(event)=>props.handleChange(event)}/>
        </div>

    ) : (
        <div>
            {Object.keys(props.ingredient).map((key,i)=>{
                if (!(key==="id")){
                    return <div key={i}>
                        <label htmlFor={key}>{key} </label>
                        <input name={key} onChange={(event)=>props.handleChange(event)} value={props.ingredient[key]}/>
                    </div>
                }

            })}

        </div>

    )
}