import axios from "axios";

export const setEmailSentDays = async(days,setLoading,setError,setData) => {
    try {
      setError("");
      const baseUrl = process.env.NEXT_PUBLIC_EMAIL_SERVER_API;
      if (!baseUrl) {
        setError("server url is not available");
        return;
      }
      setLoading(true);
      const { data } = await axios.post(
        `${baseUrl}/set-which-days-email-sent`,
        {
          days,
        }
      );
      if (!data) {
        setError("data is not available");
        return;
        setLoading(false);
      }
      console.log("data ",data.result.days);
      setData(data.result.days);
      setLoading(false);
    } catch (error) {
        setError("errro occurred while updating days");
        setLoading(false);
    }
}