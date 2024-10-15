"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  PlusIcon,
  MinusIcon,
  Trash2Icon,
  GripVertical,
  EditIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getFaqs } from "@/functions/getFaqs";
import { updateFAQ } from "@/functions/updateFeq";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { checkIsAdminLogin } from "@/functions/checkIsAdminLogin";

export default function FAQ() {

  const router = useRouter();
  const isLogedIn = checkIsAdminLogin();
  if (!isLogedIn) {
    router.push("/login");
  }

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    getFaqs(setFaqs, setLoading, setError);
  }, []);

  const startEditing = (id) => {
    setEditingIndex(id);
    setExpandedIndex(id);
  };

  const callApi = async () => {
    updateFAQ(faqs, setFaqs, setLoading, setError);
  };

  useEffect(() => {
    setFaqs((prev) => faqs);
  }, [faqs]);

  const handleEditFAQ = (id, newQuestion, newAnswer) => {
    const updatedFaqs = faqs.map((faq, index) =>
      index === id ? { ...faq, question: newQuestion, answer: newAnswer } : faq
    );
    setFaqs(updatedFaqs);
  };

  const handleSaveEditedFaq = () => {
    updateFAQ(faqs, setFaqs, setLoading, setError);
    setEditingIndex(null);
  };

  const handleDragStart = (event, info) => {
    console.log("Drag started:", event, info);
  };

  const handleDragEnd = (event, info) => {
    console.log("Drag ended:", event, info);
    console.log(faqs);
    callApi();
  };

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Frequently Asked Questions
      </h1>

      <Reorder.Group
        axis="y"
        values={faqs}
        onReorder={setFaqs}
        className="space-y-4"
      >
        <AnimatePresence>
          {faqs.map((faq, index) => (
            <Reorder.Item
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              key={index}
              value={faq}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 cursor-move">
                  <GripVertical className="h-5 w-5 text-gray-400 mr-2" />

                  {editingIndex === index ? (
                    <Input
                      value={faq.question}
                      onChange={(e) =>
                        handleEditFAQ(index, e.target.value, faq.answer)
                      }
                      className="flex-grow mr-2"
                    />
                  ) : (
                    <h3 className="text-lg font-semibold flex-grow">
                      {faq.question}
                    </h3>
                  )}

                  <div className="flex items-center space-x-2">
                    {editingIndex === index ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSaveEditedFaq()}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(index)}
                      >
                        <EditIcon className="h-5 w-5 text-gray-500" />
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedIndex === faq.id ? (
                        <MinusIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <PlusIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFAQ(index)}
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
                      {editingIndex === index ? (
                        <Textarea
                          value={faq.answer}
                          onChange={(e) =>
                            handleEditFAQ(index, faq.question, e.target.value)
                          }
                          className="w-full"
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-600">{faq.answer}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>

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

// import React, { useState } from "react";
// import { motion, AnimatePresence, Reorder } from "framer-motion";
// import {
//   PlusIcon,
//   MinusIcon,
//   Trash2Icon,
//   EditIcon,
//   GripVertical,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// export default function FAQ() {
//   const [faqs, setFaqs] = useState([
//     {
//       id: 1,
//       question: "What is AgentCoach.ai?",
//       answer:
//         "AgentCoach.ai is an AI-powered platform designed to help real estate agents improve their skills and grow their business.",
//     },
//     {
//       id: 2,
//       question: "How does AgentCoach.ai work?",
//       answer:
//         "AgentCoach.ai uses advanced AI algorithms to analyze your performance, provide personalized feedback, and offer tailored training modules to enhance your real estate skills.",
//     },
//   ]);

//   const [newQuestion, setNewQuestion] = useState("");
//   const [newAnswer, setNewAnswer] = useState("");
//   const [expandedIndex, setExpandedIndex] = useState(null);
//   const [editingIndex, setEditingIndex] = useState(null);

//   const handleAddFAQ = () => {
//     if (newQuestion.trim() && newAnswer.trim()) {
//       setFaqs([
//         ...faqs,
//         { id: Date.now(), question: newQuestion, answer: newAnswer },
//       ]);
//       setNewQuestion("");
//       setNewAnswer("");
//     }
//   };

//   const handleDeleteFAQ = (id) => {
//     const updatedFaqs = faqs.filter((faq) => faq.id !== id);
//     setFaqs(updatedFaqs);
//     if (expandedIndex === id) {
//       setExpandedIndex(null);
//     }
//     if (editingIndex === id) {
//       setEditingIndex(null);
//     }
//   };

//   const toggleExpand = (id) => {
//     setExpandedIndex(expandedIndex === id ? null : id);
//   };

//   const startEditing = (id) => {
//     setEditingIndex(id);
//     setExpandedIndex(id);
//   };

//   const handleEditFAQ = (id, newQuestion, newAnswer) => {
//     const updatedFaqs = faqs.map((faq) =>
//       faq.id === id
//         ? { ...faq, question: newQuestion, answer: newAnswer }
//         : faq,
//     );
//     setFaqs(updatedFaqs);
//     setEditingIndex(null);
//   };

//   return (
//     <div className="space-y-6">
//       <h1
//         className="text-3xl font-bold text-gray-900"
//       >
//         Frequently Asked Questions
//       </h1>

//       <Reorder.Group
//         axis="y"
//         values={faqs}
//         onReorder={setFaqs}
//         className="space-y-4"
//       >
//         <AnimatePresence>
//           {faqs.map((faq) => (
//             <Reorder.Item key={faq.id} value={faq}>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white rounded-lg shadow-md overflow-hidden"
//               >
//                 <div
//                   className="flex items-center justify-between p-4 cursor-move"
//                 >
//                   <GripVertical
//                     className="h-5 w-5 text-gray-400 mr-2"
//                   />

//                   {editingIndex === faq.id ? (
//                     <Input
//                       value={faq.question}
//                       onChange={(e) =>
//                         handleEditFAQ(faq.id, e.target.value, faq.answer)
//                       }
//                       className="flex-grow mr-2"
//                     />
//                   ) : (
//                     <h3
//                       className="text-lg font-semibold flex-grow"
//                     >
//                       {faq.question}
//                     </h3>
//                   )}

//                   <div
//                     className="flex items-center space-x-2"
//                   >
//                     {editingIndex === faq.id ? (
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setEditingIndex(null)}
//                       >
//                         Save
//                       </Button>
//                     ) : (
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => startEditing(faq.id)}
//                       >
//                         <EditIcon
//                           className="h-5 w-5 text-gray-500"
//                         />
//                       </Button>
//                     )}

//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => toggleExpand(faq.id)}
//                     >
//                       {expandedIndex === faq.id ? (
//                         <MinusIcon
//                           className="h-5 w-5 text-gray-500"
//                         />
//                       ) : (
//                         <PlusIcon
//                           className="h-5 w-5 text-gray-500"
//                         />
//                       )}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => handleDeleteFAQ(faq.id)}
//                     >
//                       <Trash2Icon
//                         className="h-5 w-5 text-red-500"
//                       />
//                     </Button>
//                   </div>
//                 </div>
//                 <AnimatePresence>
//                   {expandedIndex === faq.id && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="px-4 pb-4"
//                     >
//                       {editingIndex === faq.id ? (
//                         <Textarea
//                           value={faq.answer}
//                           onChange={(e) =>
//                             handleEditFAQ(faq.id, faq.question, e.target.value)
//                           }
//                           className="w-full"
//                           rows={4}
//                         />
//                       ) : (
//                         <p
//                           className="text-gray-600"
//                         >
//                           {faq.answer}
//                         </p>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             </Reorder.Item>
//           ))}
//         </AnimatePresence>
//       </Reorder.Group>

//       <div
//         className="bg-white rounded-lg shadow-md p-4 space-y-4"
//       >
//         <h2 className="text-xl font-semibold">
//           Add New FAQ
//         </h2>
//         <Input
//           placeholder="Enter question"
//           value={newQuestion}
//           onChange={(e) => setNewQuestion(e.target.value)}
//         />

//         <Textarea
//           placeholder="Enter answer"
//           value={newAnswer}
//           onChange={(e) => setNewAnswer(e.target.value)}
//           rows={4}
//         />

//         <Button onClick={handleAddFAQ}>
//           Add FAQ
//         </Button>
//       </div>
//     </div>
//   );
// }
