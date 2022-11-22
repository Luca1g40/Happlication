import ErrormeldingLabel from "../utils/ErrormeldingLabel";
import React, {useEffect, useRef, useState} from "react";
import {getAllCategories, getAllIngredients} from "../../urlMappings/MenuRequests";
import axios from "axios";

export default function ProductForm(props){

    const ref = useRef(null);
    const[ingredientList,setIngredientList] = useState([])
    const[allCategories,setallCategories] = useState([])

    // const [imagePreview, setImagePreview] = useState(null);
    // const [imageData, setImageData] = useState(null);
    // const [imageName, setImageName] = useState("");

    // TODO give subcategory starting value
    useEffect(() => {
        getAllCategories()
            .then(res => {
               setallCategories(res)

            })
            .catch(err => {
                console.log(err)
            })
        getAllIngredients()
            .then(res => {
                setIngredientList(res);

            })
            .catch(err => {
                console.log(err)
            })
       console.log(props.product)

    },[])
    // const handleUploadClick = event => {
    //     let file = event.target.files[0];
    //     console.log(URL.createObjectURL(file))
    //     // const imageData = new FormData();
    //     imageData.append('imageFile', file);
    //     imageData.append('imageName', imageName);
    //     // console.log(imageData)
    //    setImageData(imageData);
    //     //setImagePreview(URL.createObjectURL(file));
    // };
    // const uploadImage = (imageData) => {
    //     if (imageData.entries().next().value[1] !== null) {
    //         const response = axios.post(axios.defaults.baseURL + `/api/upload/image`, imageData, {
    //             onUploadProgress:progressEvent => {
    //                 console.log("Uploading : " + ((progressEvent.loaded / progressEvent.total) * 100).toString() + "%")
    //             }
    //         });
    //         console.log(response.data)
    //     }
    // };

    // const uploadImageWithAdditionalData = () => {
    //     imageData.append('imageName', imageName);
    //     uploadImage(imageData)
    // };


    return (props.product===undefined) ? (
        <>
            <h1>Create product</h1>
            <div className={"crud-form"} >
                <label className={"left-column"} htmlFor="destination">Destination: </label>
                <select className={"right-column"} name={"destination"} onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <div>
                    <label className={"left-column"} htmlFor="name">Name:</label>
                    <input className={"right-column"} name={"name"} placeholder={""} onChange={(event)=>props.handleChange(event)}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="type">Category:</label>
                    <select className={"right-column"} name={"type"} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"FOOD"} >Food</option>
                    </select>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="subcategory">Sub category:</label>
                    <select className={"right-column"} name={"subcategory"} onChange={(event)=>props.handleChange(event)}>
                        {allCategories.map(category=>{
                            return <option key={category.id.id} value={category.name}> {category.name}</option>
                        })}
                    </select>
                </div>


                <div>
                    <label className={"left-column"} htmlFor="price">Prize:</label>
                    <input className={"right-column"} type={"number"} name={"price"} min={0}  onChange={(event)=>props.handleChange(event)}/>
                </div>


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



                <div>
                    <label className={"left-column"} htmlFor="details">Product details:</label>
                    <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."}  onChange={props.handleChange}/>
                </div>
            </div>
        </>
        // <form>
        //     <div>
        //         <label htmlFor="image">Image:</label>
        //         <input  type={"file"} name={"image"} onChange={(event)=>handleUploadClick(event)}/>
        //         <button onClick={()=>uploadImageWithAdditionalData()}>upload</button>
        //     </div>
        // </form>

    ) : (
        <>
            <h1>Edit product</h1>
            <div className={"crud-form"} ref={ref}>
                <label className={"left-column"} htmlFor="productDestination">Destination: </label>
                <select className={"right-column"} name={"productDestination"}
                        disabled={props.disabled} value={props.product.productDestination}
                        onChange={(event)=>props.handleChange(event)}>
                    <option value={"BAR_PRODUCT"} >Bar</option>
                    <option value={"KITCHEN_PRODUCT"} >Kitchen</option>
                </select>

                <div>
                    <label className={"left-column"} htmlFor="name">Name:</label>
                    <input className={"right-column"} name={"name"} placeholder={""} disabled={props.disabled} value={props.product.name} onChange={(event)=>props.handleChange(event)}/>
                </div>

                <div>
                    <label className={"left-column"} htmlFor={"productCategoryName"}>Sub category:</label>
                    <select className={"right-column"} disabled={props.disabled} name={"productCategoryName"}
                            value={props.product.productCategoryName} onChange={(event)=>props.handleChange(event)}>
                        {allCategories.map((category,i)=>{
                            return <option key={i} value={category.name}> {category.name}</option>
                        })}
                    </select>
                </div>

                <div>
                    <label className={"left-column"} htmlFor="productCategory">Category:</label>
                    <select className={"right-column"} name={"productCategory"} disabled={props.disabled}
                            value={props.product.productCategory} onChange={(event)=>props.handleChange(event)}>
                        <option value={"DRINKS"} >Drinks</option>
                        <option value={"EXTRA"} >Extra</option>
                        <option value={"DESSERT"} >Dessert</option>
                        <option value={"SIDE"} >Side</option>
                        <option value={"STARTER"} >Starter</option>
                        <option value={"MAIN_COURSE"} >Main course</option>
                    </select>
                </div>


                <div>
                    <label className={"left-column"} htmlFor="price">Prize:</label>
                    <input className={"right-column"} type={"number"} name={"price"} min={0} disabled={props.disabled} value={props.product.price} onChange={(event)=>props.handleChange(event)}/>
                </div>


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

                <div>
                    <label className={"left-column"} htmlFor="details">Product details:</label>
                    <textarea className={"right-column details-text"} name={"details"} placeholder={"enter text..."} value={props.product.details} disabled={props.disabled}  onChange={props.handleChange}/>
                </div>
            </div>

        </>
    );

}