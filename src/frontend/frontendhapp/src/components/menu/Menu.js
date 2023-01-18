import SubCategory from "./SubCategory";
import React, {useEffect, useState} from "react";
import {getMenuDrinkItems, getMenuFoodItems} from "../../urlMappings/MenuRequests";
import {useParams} from "react-router";
import {Link, useNavigate} from "react-router-dom";


export default function Menu(props) {
    const [products, setProducts] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState(useParams().type)
    const [header, setHeader] = useState();
    let navigate = useNavigate();


    useEffect(() => {
        console.log(selectedProductType)
        switch (selectedProductType) {
            case "foods":
                getMenuFoodItems()
                    .then(res => {
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
                    .then(res => {
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


    function showProductBasedOnCategory(category) {
        console.log(category)
        return products.filter(product => {
                console.log(product)
                return product.productCategoryName === category;
            }
        )
    }

    //TODO altijd bij foods beginnen? dan kan de ding gewoon mer de state werken
    function switchProductType() {
        if (selectedProductType === "foods") {
            setSelectedProductType("drinks")
            navigate("/menu/drinks")
        } else {
            setSelectedProductType("foods")
            navigate("/menu/foods")
        }

    }

    function getUniqueProductCategories(products) {
        let productCategories = products.map(product => {
            return product.productCategoryName
        })
        const uniqueProductCategories = productCategories.filter((x, i, a) => a.indexOf(x) === i)
        let sortedUniqueProductCategories = uniqueProductCategories.map(category => {
            return category
        })
        console.log(sortedUniqueProductCategories.sort())
        return sortedUniqueProductCategories.sort()
    }

    function scrollToElement(category) {
        console.log(category)
        document.querySelector(`#${category}`).scrollIntoView()

    }

    return (
        <>
            <div className={"navigation-buttons-menu space-around"}>
                <Link className="button" to="/home"> Terug </Link>
                <Link to="/shoppingcart" className="button">Shopping cart</Link>
                {selectedProductType === "foods" ? (
                    <button className="button toDrinks" onClick={switchProductType}>Dranken</button>
                ) : (
                    <button className="button toFoods" onClick={switchProductType}>Gerechten</button>
                )}
            </div>

            <div className={"scrollable-buttons"}> {
                getUniqueProductCategories(products).map((category, i) => {
                    return <button key={i} className={"button menu-nav"}
                                   onClick={() => scrollToElement(category.replace(/\s+/g, ''))}>{category}</button>
                })
            }
            </div>
            <div className={"list-wrapper"}>
                <ul className={"list"}>
                    <h1>{header}</h1>
                    <ul className={"list"}>
                        {
                            getUniqueProductCategories(products).map((subCategorie, i) => {
                                return <SubCategory key={subCategorie + i}
                                                    products={showProductBasedOnCategory(subCategorie)}
                                                    id={subCategorie.replace(/\s+/g, '')} category={subCategorie}/>
                            })
                        }
                    </ul>
                </ul>
            </div>
        </>

    )
}