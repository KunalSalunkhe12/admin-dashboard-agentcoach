"use client"

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  UserIcon,
  XIcon,
  SendIcon,
  CheckIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { adminLogin } from "@/functions/adminLogin";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminRequest, setShowAdminRequest] = useState(false);
  const [adminRequestName, setAdminRequestName] = useState("");
  const [adminRequestEmail, setAdminRequestEmail] = useState("");
  const [adminRequestReason, setAdminRequestReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error,setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
   await adminLogin(email,password,setIsLoading,setError,router);
    setIsLoading(false);
  };

  const handleAdminRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    // Handle admin request logic here
    console.log("Admin request submitted:", {
      name: adminRequestName,
      email: adminRequestEmail,
      reason: adminRequestReason,
    });
    // Reset form after successful submission
    setTimeout(() => {
      setShowAdminRequest(false);
      setSubmitSuccess(false);
      setAdminRequestName("");
      setAdminRequestEmail("");
      setAdminRequestReason("");
    }, 2000);
  };

  return (
    <div
      className="flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div
          className="bg-white shadow-2xl rounded-3xl overflow-hidden"
        >
          <div className="p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="text-center mb-8"
            >
              <h1
                className="text-3xl font-bold text-gray-800"
              >
                Admin Login
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back! Please sign in to your account.
              </p>
            </motion.div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />

                  <UserIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-12 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter your password"
                    required
                  />

                  <LockIcon
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOffIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    <div
                      className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"
                    ></div>
                    Signing In...
                  </motion.div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </div>
          <div
            className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center"
          >
            <p className="text-sm text-red-600">
              {error}
              {/* Don't have an account?{" "}
              <button
                onClick={() => setShowAdminRequest(true)}
                className="font-medium text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out"
              >
                Contact administrator
              </button> */}
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showAdminRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-lg p-6 w-full max-w-md relative overflow-hidden"
            >
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckIcon
                      className="w-8 h-8 text-green-500"
                    />
                  </motion.div>
                  <h2
                    className="text-2xl font-bold text-gray-800 mb-2"
                  >
                    Request Submitted!
                  </h2>
                  <p className="text-gray-600">
                    Thank you for your request. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div
                    className="flex justify-between items-center mb-4"
                  >
                    <h2
                      className="text-xl font-bold"
                    >
                      Request Admin Access
                    </h2>
                    <button
                      onClick={() => setShowAdminRequest(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                    >
                      <XIcon size={24} />
                    </button>
                  </div>
                  <form
                    onSubmit={handleAdminRequest}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="admin-name">
                        Name
                      </Label>
                      <Input
                        value={adminRequestName}
                        onChange={(e) => setAdminRequestName(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="admin-email">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={adminRequestEmail}
                        onChange={(e) => setAdminRequestEmail(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="admin-reason"
                      >
                        Reason for Access
                      </Label>
                      <Textarea
                        value={adminRequestReason}
                        onChange={(e) => setAdminRequestReason(e.target.value)}
                        required
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center justify-center"
                        >
                          <div
                            className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"
                          ></div>
                          Submitting...
                        </motion.div>
                      ) : (
                        <>
                          <SendIcon
                            className="w-5 h-5 mr-2"
                          />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}

              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isSubmitting ? 1 : 0 }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
