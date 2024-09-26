import axios from "axios";

export const getNewsletterPageData = async(setData,setLoading,setError) => { 
    try {
        const baseUrl = process.env.NEXT_PUBLIC_EMAIL_SERVER_API;
        if (!baseUrl) { 
            setError("server base url is not found.");
            return;
        }
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/newsletter-data`);
        if (!data) {
            setError("server data is not available.");
            setLoading(false);
            return;
        }
        console.log(data);
        setData(data);
        setLoading(false);
    } catch (error) {
        setError("error occurred while fetching newsletter data.");
        setLoading(false);
        console.log(error);
    }
}