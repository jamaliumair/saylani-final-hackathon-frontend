"use client"
import { ApiRoutes } from "@/constant/constant";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

// app/verify-email/[token]/page.js
export default function VerifyEmail({ params }) {

  const [verificationStatus, setVerificationStatus] = useState("Email is verifying");
  const { token } = useParams(); // Move this outside useEffect
  console.log(token)
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(ApiRoutes.verify, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'token': token
          },
        });
        const result = await response.json();
        if (response.status === 200) {  // Explicitly check for 200 status
          setVerificationStatus('Email verified successfully!');
          // router.push('/login');
        } else {
          setVerificationStatus(result.msg || 'Verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('An error occurred during verification.');
      }
    };

    verifyEmail();
  }, [token]); // Add token as a dependency

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>{verificationStatus}</h1>
    </div>
  )
}