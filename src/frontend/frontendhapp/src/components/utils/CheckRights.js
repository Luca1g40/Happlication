export function CheckRights(){
    const rights = sessionStorage.getItem("rights")
    if(rights == null){
        window.location = '/error403'
    }
}