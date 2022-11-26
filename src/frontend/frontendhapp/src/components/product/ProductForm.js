import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React, {useEffect, useRef, useState} from "react";
import {createProduct, getAllCategories, getAllIngredients} from "../../urlMappings/MenuRequests";
import axios from "axios";
import {configuration} from "../../urlMappings/JwtHeader";

export default function ProductForm(props){

    const ref = useRef(null);
    const[ingredientList,setIngredientList] = useState([])
    const[allCategories,setallCategories] = useState([])
    const [selectedImage,setSelectedImage] = useState()

    // TODO give subcategory starting value
    useEffect(() => {

        getAllIngredients()
            .then(res => {
                setIngredientList(res);

            })
            .catch(err => {
                console.log(err)
            })
        console.log(props.product,props.creating)
        // setSelectedImage()
    },[])


    const handleUploadClick = event => {
        // let file = event.target.files[0];
        // setSelectedImage(file)


        const filee = new FormData();
        filee.append('test_file', event.target.files[0]);
        filee.append('test_json',{name:"yoo"})

        let file;
        let count = 0
        for (const [key, value] of filee.entries()) {

            if (count===0){
                file = value
            }


            // console.log(key,value)
            count ++;
        }
        props.setSelectedImage(file)
        console.log(file)
        //  const imageData = new FormData();
        //  imageData.append('imageFile', file);
        //  imageData.append('imageName', imageName);
        //  console.log(imageData)
        // setImageData(imageData);
        //setImagePreview(URL.createObjectURL(file));
    };

    return (props.creating) ? (
        <>
            <h1>Create product</h1>
            <div className={"crud-form"} >
                <label className={"left-column"} htmlFor="productDestination">Destination: </label>
                <select className={"right-column"} name={"productDestination"} onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <div>
                    <label className={"left-column"} htmlFor="name">Name:</label>
                    <input className={"right-column"} name={"name"} placeholder={""} onChange={(event)=>props.handleChange(event)}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="productType">Category:</label>
                    <select className={"right-column"} name={"productType"} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINK"} >Drink</option>
                        <option value={"FOOD"} >Food</option>
                    </select>
                </div>


                <label className={"left-column"} htmlFor="productCategoryName">Sub category:</label>
                <select className={"right-column"} name={"productCategoryName"} onChange={(event)=>props.handleChange(event)}>
                    {props.allCategories.map(category => {
                        return <option key={category.id.id} value={category.name}> {category.name}</option>
                    })}
                </select>

                    <label className={"left-column"} htmlFor="price">Prize:</label>
                    <input className={"right-column"} type={"number"} name={"price"} min={0}  onChange={(event)=>props.handleChange(event)}/>



                <div className={"add-ingredient-div"}>
                    <label className={"left-column"} htmlFor="product-ingredients-dropdown">Add ingredients</label>
                    <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} >
                        {ingredientList.map(ingredient =>{
                            return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                        })
                        }
                    </select>
                    <button className={"add-ingredient-button"} onClick={()=>props.addIngredient(ref.current.value)}>Add ingredient:</button>
                </div>

                <label className={"left-column"} htmlFor="product-ingredients">Ingredients:</label>

                <div className={"ingredient-filter left-column"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}
                </div>


                <div className={"error-label"}>
                    <ErrormeldingLabel text={props.errorMeldingText}/>
                </div>

                    <label className={"left-column"} htmlFor="details">Product details:</label>
                    <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."}  onChange={props.handleChange}/>

            </div>
             <form>
                 <div>
                     <label htmlFor="image">Image:</label>
                     <input  type={"file"}  name={"image"} onChange={(event)=>handleUploadClick(event)}/>
                 </div>
             </form>
        </>


    ) : (
        <>
            <h1>Edit product</h1>
            <div className={"crud-form"}>
                <label className={"left-column"} htmlFor="productDestination">Destination: </label>
                <select className={"right-column"} name={"productDestination"}
                        disabled={props.disabled} value={props.product.productDestination}
                        onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <label className={"left-column"} htmlFor="name">Name:</label>
                <input className={"right-column"} name={"name"} placeholder={""} disabled={props.disabled} value={props.product.name} onChange={(event)=>props.handleChange(event)}/>

                <div>
                    <label className={"left-column"} htmlFor="productType">Category:</label>
                    <select className={"right-column"} name={"productType"} disabled={props.disabled} value={props.product.productType} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINK"} >Drink</option>
                        <option value={"FOOD"} >Food</option>
                    </select>
                </div>

                <label className={"left-column"} htmlFor="productCategoryName">Sub category:</label>
                <select className={"right-column"} name={"productCategoryName"} value={props.product.productCategoryName}  disabled={props.disabled} onChange={(event)=>props.handleChange(event)}>
                    {props.allCategories.map(category=>{
                        return <option key={category.id.id} value={category.name}> {category.name}</option>
                    })}
                </select>


                <label className={"left-column"} htmlFor="price">Prize:</label>
                <input className={"right-column"} type={"number"} name={"price"} min={0} disabled={props.disabled} value={props.product.price} onChange={(event)=>props.handleChange(event)}/>


                <div className={"add-ingredient-div"}>
                    <label className={"left-column"} htmlFor="product-ingredients-dropdown">Add ingredients</label>
                    <select ref={ref} className={"left-column ingredient-dropdown"} name={"product-ingredients-dropdown"} disabled={props.disabled}>
                        {ingredientList.map(ingredient =>{
                            return <option key={ingredient.id} value={ingredient.name}> {ingredient.name}</option>
                        })
                        }
                    </select>
                    <button className={"add-ingredient-button"} onClick={()=>props.addIngredient(ref.current.value)} disabled={props.disabled}>Add ingredient:</button>
                </div>

                <label className={"left-column"} htmlFor="product-ingredients">Ingredients</label>

                <div className={"ingredient-filter left-column"}>
                    {props.toegevoegdeIngredienten.map((ingredient,i)=>{
                        return <button name={"ingredient"} key={i} className={"remove-ingredient-button"} disabled={props.disabled} onClick={()=>props.removeFromIngredientsList(ingredient)}>{ingredient} X</button>
                    })}
                </div>


                <div className={"error-label"}>
                    <ErrormeldingLabel text={props.errorMeldingText}/>
                </div>

                <label className={"left-column"} htmlFor="details">Product details:</label>
                <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."} value={props.product.details} disabled={props.disabled}  onChange={props.handleChange}/>

                <form>
                    <div>
                        <label className={"left-column"} htmlFor="imageFile">Image:</label>
                        <input className={"right-column"} type={"file"}  name={"imageFile"} onChange={(event)=>handleUploadClick(event)}/>
                    </div>
                </form>
            </div>

        </>
    );


}