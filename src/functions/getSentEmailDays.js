import axios from "axios";

export const getSentEmailDays = async (setData, setLoading, setError) => {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_EMAIL_SERVER_API;
    if (!baseUrl) {
      setError("server url is not available");
      return;
    }
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/get-which-days-email-sent`);
    if (!data) {
      setError("data is not available");
      setLoading(false);
      return;
    }
    setData(data.days);
    setLoading(false);
  } catch (error) {
    setError("error occurred while getting email send days data");
    setLoading(false);
  }
};
