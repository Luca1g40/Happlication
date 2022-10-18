export default function countOccuranceProduct(list){
    let productOccurances = new Map();
    console.log(list)
    list.map((product)=>{
        if (productOccurances.has(product)){
            productOccurances.set(product,productOccurances.get(product)+1)
        }else{
            productOccurances.set(product,1)
        }

        }
    )
    // setNewList(state => [...state,target]);
    console.log(productOccurances)
    return productOccurances;
}

