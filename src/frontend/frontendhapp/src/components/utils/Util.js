export default function getOccurrenceProducts(list) {
    let productOccurances = new Map();

    list.map(product =>{
        if (!isProductAlreadyInMap(productOccurances,product)){
            productOccurances.set(product,getTargetAmountInList(product,list))
        }
    })
    return productOccurances;
}


function getTargetAmountInList(target,list){
    let count = 0;
    list.map(product => {
        if (productCompare(product,target)){
            count += 1;
        }
    })
    return count;
}


function isProductAlreadyInMap(map,product){
    let productAlreadyInMap = false;
    map.forEach(function(key, val){
        if (productCompare(val,product)){
            productAlreadyInMap = true;
        }
    });
    return productAlreadyInMap;
}

function productCompare(obj1, obj2){
    return obj1.name === obj2.name;
}

export function showCategory(category){
    switch (category){
        case "MAIN_COURSE":
            return "Hoofdgerechten"
        case "SIDE":
            return "Bijgerechten";
        case "EXTRA":
            return "Extra";
        case "DRINKS":
            return "Drinks";
        case "DESSERT":
            return "Dessert";
        case "STARTER":
            return "Voorgerechten"
    }
}


