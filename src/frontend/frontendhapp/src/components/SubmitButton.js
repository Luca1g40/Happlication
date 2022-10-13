import React, {useState} from "react";
import "./SubmitButton.css";

export default function SubmitButton({submitUrl,buttonText,productAmount,productId}){

    function handleClick(){
        // Simple POST request with a JSON body using fetch
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //      body: JSON.stringify({ "id": productId,
        //      "amount" : productAmount })
        // };
        // fetch(submitUrl, requestOptions)
        //     .then(response => response.json())
        //     .then(data => {});
        console.log("Added");
    }

    return(
        <div>
            <button onClick={handleClick}>{buttonText}</button>
        </div>
    )
}

