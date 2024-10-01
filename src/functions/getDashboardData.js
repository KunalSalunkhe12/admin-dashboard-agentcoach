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
    const totlaMessages = data.aiUsage.General + data.aiUsage.Marketing + data.aiUsage.Motivation + data.aiUsage.Negotiation + data.aiUsage["Real Estate"] + data.aiUsage.Sales;
    data.totalMessages = totlaMessages;
    console.log(totlaMessages)
    setData(data);
    setLoading(false);
  } catch (error) {
    setError("error while fetching Dashboard data");
    console.log(error);
    setLoading(false);
  }
};
