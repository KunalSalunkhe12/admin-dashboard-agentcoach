"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, MinusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFaqs } from "@/functions/getFaqs";
import { updateFAQ } from "@/functions/updateFeq";
import Loading from "@/components/Loading";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    getFaqs(setFaqs, setLoading, setError);
  }, []);

  const handleAddFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim()) {
      const newFaqs = [...faqs, { question: newQuestion, answer: newAnswer }];
      setFaqs(newFaqs);
      setNewQuestion("");
      setNewAnswer("");
      updateFAQ(newFaqs, setFaqs, setLoading, setError);
    }
  };

  const handleDeleteFAQ = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
      setFaqs(updatedFaqs);
      updateFAQ(updatedFaqs, setFaqs, setLoading, setError);
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    };
    
    if (loading)
    {
        return <Loading/>
    }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        <AnimatePresence>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <div className="flex items-center space-x-2">
                  {expandedIndex === index ? (
                    <MinusIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <PlusIcon className="h-5 w-5 text-gray-500" />
                  )}

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFAQ(index);
                    }}
                  >
                    <Trash2Icon className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </div>
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <h2 className="text-xl font-semibold">Add New FAQ</h2>
        <Input
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <Textarea
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          rows={4}
        />

        <Button onClick={handleAddFAQ}>Add FAQ</Button>
      </div>
    </div>
  );
}
