"use client";

import useAuthStore from "@/store/authstore";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const router = useRouter()




  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email and password cannot be empty.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    setErrorMessage("");

    try {
      const { data } = await axios.post('http://localhost:4000/auth/login', { email, password });
      setUser(data.data.user);
      setToken(data.data.token);
      localStorage.setItem('token', data.data.token);
      // Cookies.set('authToken', data.data.token, { expires: 7 });
      console.log('Login successful', data);
      console.log('token', data.data.token);
      router.push("/")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.msg) {
          if (error.response.data.msg === "incorrect password") {
            setErrorMessage("Incorrect password");
          } else if (error.response.data.msg === "user not found") {
            setErrorMessage("User is not Registered.");
          } else {
            setErrorMessage("An unexpected error occurred.");
          }
        }
      }
    };
  }





  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);




  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 w-full mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 w-full mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?
          <Link
            href="/signup"
            className="text-blue-500 hover:text-blue-600 font-medium transition duration-300"
          >
            Signup here
          </Link>
        </p>



        {errorMessage && (
          <p className="mt-4 text-lg text-red-600 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

