import axios from "axios";

export const getManageLandingPagedata = async (
  setTitle,
  setSubtitle,
  setRotatingTexts,
  setLoading,
  setError
) => {
  try {
    setError("");
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    if (!baseUrl) {
      setError("server base URL is not found");
      return;
    }
    setLoading(true);
    const { data } = await axios.get(`${baseUrl}/get-landing-page`);

    console.log(data);
    if (!data) {
      setError("error getting data");
      setLoading(false);
      return;
    }
    setTitle(data?.title || "");
    setSubtitle(data?.subtitle || "");
    setRotatingTexts(data?.rotatingTexts || []);
    setLoading(false);
  } catch (error) {
    setError("error occurred while fetching manage landing page data");
    setLoading(false);
    console.log(error);
  }
};
