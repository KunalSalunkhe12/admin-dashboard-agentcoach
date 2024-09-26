import axios from "axios";

export const getDashboardData = async (setData, setLoading, setError) => {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    if (!baseUrl) {
      setError("server base URL is not found..");
      return;
    }
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/get-dashboard-data`);
    if (!data) {
      setError("Admin Dashboard data is not available");
      setLoading(false);
      return;
    }
    console.log(data);
    setData(data);
    setLoading(false);
  } catch (error) {
    setError("error while fetching Dashboard data");
    console.log(error);
    setLoading(false);
  }
};
