import React, {useState, useEffect, useRef} from "react";
import {getAllProducts, getProduct} from "../../urlMappings/MenuRequests";
import {Link, useNavigate} from 'react-router-dom';
import "../../styles/SearchTable.css"

import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import DropdownFilter from "./DropdownFilter";


export default function SearchProduct(){
    const [allProducts,setAllProducts] = useState([])
    const [filteredProducts,setFilteredProducts] = useState([])
    const [filers,setFilters] = useState([])
    const ref = useRef();
    let navigate = useNavigate()

    const [optionSelected, setOptionSelected] = useState([])


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


        if (!(optionSelected.value===undefined)){
            filterProduct = filterProduct.filter(product=>{
                return product.productCategory === optionSelected.value
            })
        }

        setFilteredProducts(filterProduct)
    }


    return(

    <div>
    <input ref={ref} placeholder={"Search"} name={"search"} onChange={handleChange}/>
    <Link to="/createproduct" className="createProductButton" >Create product</Link>

    <DropdownFilter setOptionSelected={(selected)=>setOptionSelected(selected)} optionSelected={optionSelected}/>
        <table id="searchTable">
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Details</th>
        </tr>

            {filteredProducts.map(product=>{
                return <tr key={product.id} onClick={()=>navigate(`/productdetails/${product.id}`)}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.productCategory}</td>
                    <td>{product.details}</td>
                </tr>
            })}
    </table>
</div>
    )
}
