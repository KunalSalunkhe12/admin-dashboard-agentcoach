export const checkIsAdminLogin=() => {
    const token = localStorage.getItem('adminToken');
    console.log("token ---> ",token);
    if(token){
        return true;
    }else{
        return false;
    }
}