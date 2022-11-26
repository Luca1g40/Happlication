import React, {useEffect, useState} from 'react'
import "../../styles/Popup.css"

import Counter from "../utils/Counter";
import SubmitButton from "../submitData/SubmitButton";
import {Actions} from "../submitData/Actions"
import {getAllCategories, getAllIngredients} from "../../urlMappings/MenuRequests";


function ProductDetailsPopup(props) {
    const [productAmount, setProductAmount] = useState(1)

    useEffect(() => {
        console.log(props.product.imagePath)
    },[])


    function closePopUp() {
        console.log("closing popup")
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div className={"gerecht-aantal"}>
                    <p className={"grid-item-1"}>{props.product.name} </p>
                    <Counter initialValue={productAmount} updateCount={count => setProductAmount(count)} submitMode={false}/>
                    <button className="close-btn button" onClick={closePopUp}> X </button>
                </div>
                <div className={"label-div"}>
                    <div className={"border-div"}>
                        <label>{props.product.details}</label>
                    </div>
                </div>

                <div>
                    <img src={require(`../../images/${props.product.imagePath}` )} alt={"image not found"}/>
                </div>

                <div className={"add-to-cart-div"}>
                <SubmitButton className={"button"} tableId={577} buttonText={"Add to Cart"} action={Actions.ADD_TO_SHOPPING_CART}
                              productAmount={productAmount} productId={props.product.id} trigger={() =>closePopUp()}/>
                </div>
            </div>
        </div>
    ) : "";

}

export default ProductDetailsPopup