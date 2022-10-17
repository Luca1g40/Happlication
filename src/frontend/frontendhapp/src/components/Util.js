export default function countOccuranceProduct(list){
    const productOccurances = new Map();
    list.map((product)=>{
        if (productOccurances.has(product)){
            productOccurances.set(product,productOccurances.get(product)+1)
        }else{
            productOccurances.set(product,1)
        }

        }
    )
    // setNewList(state => [...state,target]);
    return productOccurances;
}

export const config = {
    headers: {
        Authorization: sessionStorage.getItem("Authorization")

    }
}