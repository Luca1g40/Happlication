import React, {useState, useEffect, useRef} from "react";
import {getAllProducts, getProduct} from "../../urlMappings/MenuRequests";
import {Link, useNavigate} from 'react-router-dom';

import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import DropdownFilter from "./DropdownFilter";


export default function SearchProduct(){
    const [allProducts,setAllProducts] = useState([])
    const [filteredProducts,setFilteredProducts] = useState([])
    const [filers,setFilters] = useState([])
    const ref = useRef();

    const [optionSelected, setOptionSelected] = useState([])


    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }

    useEffect(() => {

        getAllProducts()
            .then(res => {
                console.log(res)
                setAllProducts(res);
                setFilteredProducts(res);
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    useEffect(() => {
        handleChange()
        console.log(optionSelected)
        console.log(filteredProducts)
    },[optionSelected])



//TODO finish dropdown update filter



    function handleChange (){
        const value = ref.current.value
        let filterProduct=[]
        setFilters(values => ({...values, "search": value}))
        if (value.trim().length>0){
            filterProduct = allProducts.filter((product)=>{
                return product.name.toLowerCase().includes(value.toLowerCase())
            })
        }else{
            filterProduct = allProducts;
        }

        // setFilters(values => ({...values, "category": optionSelected}))
        // if (!(optionSelected===undefined)){
        //     Object.keys(optionSelected).map(select=>{
        //         console.log(optionSelected[select])
        //         filterProduct=filterProduct.filter(product=>{
        //             return product.productCategory === optionSelected[select].value
        //         })
        //     })}
        // console.log(filteredProducts)
        //     setFilteredProducts(filteredProducts.filter(product=>{
        //         return product.productCategory === optionSelected.value
        //     }))
        // }
        console.log(optionSelected.value)
        filterProduct=filterProduct.filter(product=>{
                        return product.productCategory === optionSelected.value
                    })
        setFilteredProducts(filterProduct)
    }


    return(
        <div>
            <input ref={ref} placeholder={"Search"} name={"search"} onChange={handleChange}/>
            <Link to="/productdetails" >Create product</Link>
            <div>
                {filteredProducts.map((product,i)=>{
                    return  <div key={i}>
                                <Link to={`/productdetails/${product.id}`} >{product.name}</Link>
                            </div>
                })
                }
                <DropdownFilter setOptionSelected={(selected)=>setOptionSelected(selected)} optionSelected={optionSelected}/>



            </div>
        </div>
    )
}
