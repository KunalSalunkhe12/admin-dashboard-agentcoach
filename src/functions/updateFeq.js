import axios from "axios";

export const updateFAQ = async function (faqs, setData, setLoading, setError) {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    if (!baseUrl) {
      setError("server base url is not found");
      return;
    }

    setLoading(true);

    const { data } = await axios.post(`${baseUrl}/update-faqs`, {
      faqs,
    });
    if (!data) {
      setError("faqs data is not available");
      setLoading(false);
      return;
    }
    setData(data?.faqDocument?.faqs || []);
    setLoading(false);
  } catch (error) {
    setError("error occurred while updating faqs data");

    setLoading(false);
    return;
  }
};
