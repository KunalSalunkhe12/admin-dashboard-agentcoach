"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import { getManageLandingPagedata } from "@/functions/getManageLandingPageData";
import { updateLandingPage } from "@/functions/updateLandingPage";
import Loading from "@/components/Loading";

export default function page() {
  const [title, setTitle] = useState(
    "Accelerate Your Real Estate Career With Cutting-Edge Generative"
  );
  const [subtitle, setSubtitle] = useState("Motivation Guide");
  const [rotatingTexts, setRotatingTexts] = useState(["AI Coaching"]);
  const [newRotatingText, setNewRotatingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
            <span className="text-blue-300">{rotatingTexts[0]}</span> {subtitle}
            <p className="text-sm text-gray-300">
              (Rotating texts: {rotatingTexts.join(", ")})
            </p>
          </h2>
        </div>
      </div>
    </div>
  );
}
