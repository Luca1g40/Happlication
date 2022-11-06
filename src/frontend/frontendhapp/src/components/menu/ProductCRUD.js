import React, {useRef, useEffect, useState} from "react";
import {getAllIngredients} from "../../urlMappings/MenuRequests";
import ErrormeldingLabel from "../ErrormeldingLabel";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions";
import ProductForm from "./ProductForm";
import CreateProductForm from "./CreateProductForm";
import ViewProductForm from "./ViewProductForm";



export default function ProductCRUD(props){
    const [disabled,setDisabled] = useState(false)



    return(
        <ViewProductForm />
    )




}