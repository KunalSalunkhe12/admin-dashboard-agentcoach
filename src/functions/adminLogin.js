import axios from "axios";

export const adminLogin = async (email, password,setLoading,setError,router) => {
try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    setError("");
    if(!baseUrl){
        setError("server url not found");
        return;
    }
    setLoading(true);
    const {data}= await axios.post(`${baseUrl}/admin-login`,{email,password});
    if(!data){
        setError("invalid email or password");
        setLoading(false);
        return;
    }
    setLoading(false);
    console.log(data.token);
    localStorage.setItem("adminToken",data.token);
    router.push("/");
} catch (error) {
    setLoading(false);
    setError(error.response.data.message || "something went wrong");
    console.log(error.response.data.message);
}
}
