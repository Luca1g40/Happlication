export default function getOccuranceProducts(list) {
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


