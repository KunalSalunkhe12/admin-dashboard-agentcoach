import axios from "axios";

export const manageUsers = async (
  setUsersData,
  setMetaData,
  setLoading,
  setError,
  page = 1,
  limit = 5
) => {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    if (!baseUrl) {
      setError("server base URL is not found");
      return;
    }
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/get-all-users?limit=${limit}&page=${page}`);
    if (!data) {
      setError("users data is not available");
      return;
    }
    console.log(data?.users);

    setUsersData(data?.users || []);
    setMetaData(data?.meta || {});
    setLoading(false);
  } catch (error) {
    setLoading(false);
    setError("error occurred while fetching users data");
    console.log(error);
  }
};
