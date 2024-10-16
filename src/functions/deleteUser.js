import axios from "axios";

export async function deleteUser(id,setLoading,setError){
try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    setError("");
    if(!baseUrl){
        setError("server url not found");
        return;
    }
    setLoading(true);
    console.log(`${baseUrl}/delete-user/${id}`)
    const {data}= await axios.get(`${baseUrl}/delete-user/${id}`);
    console.log(data);
    if(!data){
        setError("user not found");
        setLoading(false);
        return;
    }
    setLoading(false);

} catch (error) {
    setError("error occurred while deleting user");
    setLoading(false);
}
}