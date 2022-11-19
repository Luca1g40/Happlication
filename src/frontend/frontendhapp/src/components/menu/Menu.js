import SubCategory from "./SubCategory";
import React, {useEffect, useState} from "react";
import {getMenuDrinkItems, getMenuFoodItems} from "../../urlMappings/MenuRequests";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import FoodMenu from "./FoodMenu";


export default function Menu (props){
    const [products, setProducts] = useState([]);
    const [selectedProductType,setSelectedProductType] = useState(useParams().type)
    const [header, setHeader] = useState();
    let navigate = useNavigate();


    useEffect(() => {
        console.log(selectedProductType)
        switch (selectedProductType){
            case "foods":
                getMenuFoodItems()
                    .then(res =>  {
                            setProducts(res)
                            setHeader("Gerechten")
                        }
                    )
                    .catch(err =>
                        console.log(err)
                    )
                break;
            case "drinks":
                getMenuDrinkItems()
                    .then(res =>{
                        setProducts(res)
                        setHeader("Dranken")
                    }
                    )
                    .catch(err => {
                        console.log(err)
                    })
                break;
        }

    }, [selectedProductType])


    function showProductBasedOnCategory(category){
        return products.filter(product => {
                return product.productCategoryData.name === category;
            }
        )
    }

    //TODO altijd bij foods beginnen? dan kan de ding gewoon mer de state werken
    function switchProductType(){
        if (selectedProductType === "foods"){
            setSelectedProductType("drinks")
            navigate("/menu/drinks")
        }else{
            setSelectedProductType("foods")
            navigate("/menu/foods")
        }

    }

    function getUniqueProductCategories(products){
        let productCategories = products.map(product => {return product.productCategoryData.name})
        const uniqueProductCategories = productCategories.filter((x, i, a) => a.indexOf(x) === i)
        let sortedUniqueProductCategories = uniqueProductCategories.map(category => {return category})
        console.log(sortedUniqueProductCategories)
        return sortedUniqueProductCategories.sort()
    }

    function scrollToElement(ref){
        console.log(ref)
        ref.current.scrollIntoView({ behavior: 'smooth' })

    }

    return (
        <>
            {/*<div className={"test"}> {*/}
            {/*    getUniqueProductCategories(products).map((category, i) => {*/}
            {/*        return <button key={i} className={"button menu-nav"} onClick={() => scrollToElement(Voorgerechten)}>{category}</button>*/}
            {/*    })*/}
            {/*}*/}
            {/*</div>*/}
            <div className="menu-container">
                <div className={"navigation-buttons-menu space-around"}>
                    <Link className="button toHome" to="/"> Terug </Link>
                    <Link to="/shoppingcart" className="button toShoppingcart">Shopping cart</Link>
                    { selectedProductType === "foods" ? (
                        <button className="button toDrinks" onClick={switchProductType}>Dranken</button>
                    ) : (
                        <button className="button toFoods" onClick={switchProductType}>Gerechten</button>
                    )}

                </div>
                <div className={"list-wrapper"}>
                    <ul className={"list"}>
                        <h1>{header}</h1>

                        <div className={"listDiv"}>
                            <ul className={"list"}>
                                {
                                    getUniqueProductCategories(products).map(subCategorie =>{
                                        return <SubCategory products={showProductBasedOnCategory(subCategorie)} category={subCategorie}/>
                                    })
                                }

                            </ul>
                        </div>
                    </ul>
                </div>
            </div>

        </>

    )
}