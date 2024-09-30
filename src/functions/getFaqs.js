import axios from "axios";

export const getFaqs = async function (setData, setLoading, setError) {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    if (!baseUrl) {
      setError("server base url is not found");
      return;
    }
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/faqs`);
    if (!data) {
      setError("faq data is not found");
      setLoading(false);
      return;
    }
    setData(data?.faqs||[]);
    console.log(data);
    setLoading(false);
  } catch (error) {
    setError("error occurred while fetching FAQ data");
    console.log("FAQ --> ", error);
    setLoading(false);
  }
};
