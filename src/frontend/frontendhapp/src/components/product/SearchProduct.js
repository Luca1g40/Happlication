import React, {useState, useEffect, useRef} from "react";
import {getAllProducts} from "../../urlMappings/MenuRequests";
import {Link, useNavigate} from 'react-router-dom';
import "../../styles/SearchTable.css"
import DropdownFilter from "./DropdownFilter";
import OverviewTable from "./OverviewTable";
import {showCategory} from "../utils/Util";

export default function SearchProduct(){
    const [allProducts,setAllProducts] = useState([])
    const [filteredProducts,setFilteredProducts] = useState([])
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


    function handleChange (){
        const value = ref.current.value
        let filterProduct=[]
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

    function cleardata() {
        sessionStorage.clear();
    }


    return(

    <div>
        <h1>Product overview</h1>
        <h2>Filters</h2>
        <div className={"home-button"}>
            <Link to="/administration" className="button search-products-navigation" >Home</Link>
        </div>
        <div className={"navigation-buttons"}>
            <Link to="/createproduct" className="button search-products-navigation" >Create product</Link>
            <Link to="/staff" className="button search-products-navigation" onClick={() => {cleardata()}}>Log out</Link>
        </div>
        <input className={"search-bar"} ref={ref} placeholder={"Search"} name={"search"} onChange={handleChange}/>

        <div className={"search-table"}>
        <span className={"select-filters"}>
            <DropdownFilter setOptionSelected={(selected)=>setOptionSelected(selected)} optionSelected={optionSelected}/>
        </span>
        <OverviewTable tableHeads={["name","category","price","details"]} items={filteredProducts} handleClick={id=>navigate(`/productdetails/${id}`)} leaveOutList={["ingredients","productDestination","id","imagePath"]}
                       specialDisplays={ new Map([["productCategory", (category)=>showCategory(category)]])
                       }/>
    </div>
</div>
    )
}
