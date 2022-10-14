export default function countOccuranceProduct(target,list,setNewList){
    let count = 0;
    list.map((product)=>{

            if (product === target) {
                count++;
            }
        }
    )
    setNewList(state => [...state,target]);
    return count;
}