import axios from "axios";

export const updateLandingPage = async (
  setTitle,
  setSubtitle,
  setRotatingTexts,
  setLoading,
  setError,
  title,
  subtitle,
  rotatingTexts
) => {
 try {
   setError("");
   const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
   if (!baseUrl) {
     setError("server base URL is not found");
     return;
   }
   setLoading(true);
     const { data } = await axios.post(`${baseUrl}/update-landing-page`, {
       firstText: title,
       text: rotatingTexts,
       secoundText: subtitle,
     });

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




    