export const logOutAdmin = ()=>{
    localStorage.removeItem("adminToken");
    console.log("admin logged out");
}