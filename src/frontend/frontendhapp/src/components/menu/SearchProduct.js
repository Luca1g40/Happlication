import {useState, useEffect, useRef} from "react";
import {getAllProducts, getProduct} from "../../urlMappings/MenuRequests";
import {Link, useNavigate} from 'react-router-dom';


export default function SearchProduct(){
    const [allProducts,setAllProducts] = useState([])
    const [filteredProducts,setFilteredProducts] = useState([])
    const [filers,setFilters] = useState([])
    const ref = useRef();
    const navigate = useNavigate();



    // const handleChange = (event) => {
    //     const name = event.target.name;
    //     const value = event.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }

    useEffect(() => {
        console.log("rerender")
        getAllProducts()
            .then(res => {
                console.log(res);
                setAllProducts(res);
                setFilteredProducts(res);
            })
            .catch(err => {
                console.log(err)
            })
    },[])



    const toComponentB=()=>{
        navigate('/productdetails',{state:{id:1,name:'sabaoon'}});
    }
    const handleChange = (event) =>{
        const value = ref.current.value

        setFilters(values => ({...values, [event.target.name]: value}))
        setFilteredProducts(allProducts.filter((product)=>{
            return product.name.toLowerCase().includes(value.toLowerCase())
        }))
    }

    return(
        <div>
            <input ref={ref} placeholder={"Search"} name={"search"} onChange={(event)=>handleChange(event)}/>
            <Link to="/productdetails" >Create product</Link>
            <div>
                {filteredProducts.map((product)=>{
                    return  <div>
                                <Link to={`/productdetails/${product.id}`} >{product.name}</Link>
                            </div>
                })
                }
            </div>
        </div>
    )
}