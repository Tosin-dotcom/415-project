"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const getCsrfCookie = async () => {
    try {
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to fetch CSRF cookie", error);
    }
  };
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    const loginPayload = { email, password };

    try {
      await getCsrfCookie();
      const response = await api.post(`api/login`, loginPayload);
      console.log(response.data);
      const cleanedToken = response.data.token.split("|")[1];
      localStorage.setItem("token", cleanedToken);
      localStorage.setItem("userId", response.data.user.id);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Section - Image Only */}
      <div className="hidden md:block w-1/2 h-full">
        <img
          src="https://images.unsplash.com/photo-1507537417841-81e85feb9bd2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9hbnxlbnwwfDF8MHx8fDA%3D"
          alt="Loan Management"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Debt Recovery System</h2>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>
            
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md border border-red-200 text-sm">
                {errorMessage}
              </div>
            )}
            
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}