"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { getManageLandingPagedata } from "@/functions/getManageLandingPageData";
import { updateLandingPage } from "@/functions/updateLandingPage";
import Loading from "@/components/Loading";
import { AnimatePresence,motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { checkIsAdminLogin } from "@/functions/checkIsAdminLogin";

export default function page() {
  const router = useRouter();
useEffect(()=>{
  const isLogedIn = checkIsAdminLogin();
  if (!isLogedIn) {
    router.push("/login");
  }
},[])

  const [title, setTitle] = useState(
    "Accelerate Your Real Estate Career With Cutting-Edge Generative"
  );
  const [subtitle, setSubtitle] = useState("Motivation Guide");
  const [rotatingTexts, setRotatingTexts] = useState(["AI Coaching"]);
  const [newRotatingText, setNewRotatingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % rotatingTexts.length,
      );
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [rotatingTexts]);


  const handleAddRotatingText = () => {
    if (newRotatingText.trim() !== "") {
      setRotatingTexts([...rotatingTexts, newRotatingText.trim()]);
      setNewRotatingText("");
    }
  };

  const handleRemoveRotatingText = (index) => {
    const updatedTexts = rotatingTexts.filter((_, i) => i !== index);
    setRotatingTexts(updatedTexts);
  };

  const handleUpdateLandingPage = () => {
    updateLandingPage(
      setTitle,
      setSubtitle,
      setRotatingTexts,
      setLoading,
      setError,
      title,
      rotatingTexts,
      subtitle
    );
  };

  useEffect(() => {
    getManageLandingPagedata(
      setTitle,
      setSubtitle,
      setRotatingTexts,
      setLoading,
      setError
    );
  }, []);

   if (loading) {
     return <Loading />;
   }
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Manage Landing Page</h1>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label
            htmlFor="subtitle"
            className="block text-sm font-medium text-gray-700"
          >
            Subtitle
          </label>
          <Input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rotating Texts
          </label>
          <ul className="mt-1 space-y-2">
            {rotatingTexts.map((text, index) => (
              <li key={index} className="flex items-center">
                <Input value={text} readOnly className="flex-grow" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveRotatingText(index)}
                  className="ml-2"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          <Input
            value={newRotatingText}
            onChange={(e) => setNewRotatingText(e.target.value)}
            placeholder="Add new rotating text"
            className="flex-grow"
          />

          <Button onClick={handleAddRotatingText} className="ml-2">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        <Button onClick={handleUpdateLandingPage} className="ml-2 ">
          Update
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="bg-blue-900 p-6 rounded-lg text-white">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <h2 className="text-3xl font-semibold mb-4">
          <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-yellow-300 ml-2 inline-block min-w-[120px]"
              >
                {rotatingTexts[currentTextIndex]}
              </motion.span>
            </AnimatePresence> {subtitle}
            <p className="mt-5 text-sm text-gray-300">
              (Rotating texts: {rotatingTexts.join(", ")})
            </p>
          </h2>
        </div>
      </div>
    </div>
  );
}
