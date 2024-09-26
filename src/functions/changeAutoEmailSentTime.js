import axios from "axios";
import { setQuarter, setWeek } from "date-fns"

export const changeAutoEmailSentTime = async (newTime,setLoading, setError) => {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_EMAIL_SERVER_API;
    if (!baseUrl) {
      setError("server base url is not found");
      return;
    }
    const { data } = await axios.post(
      `${baseUrl}/change-auto-email-sent-time`,
      {
        newTime,
      }
    );
    if (!data) {
      setError("data not found");
      setLoading(false);
      return;
    }
    setLoading(false);
  } catch (error) {
    setError("error occurred while updating auto email sent time");
    setLoading(false);
  }
};