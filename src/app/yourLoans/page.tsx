"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loan } from "../admin/page";

export default function YourLoans() {
    const [loans, setLoans] = useState<Loan[]>([]); // State to store loan data
    const [error, setError] = useState(""); // State to handle errors

    useEffect(() => {
        const fetchLoans = async () => {
            const id = localStorage.getItem("userActive");
            console.log("User ID:", id);

            if (!id) {
                setError("User ID not found in localStorage");
                setTimeout(() => setError(""), 4000);
                return;
            }

            try {
                const { data } = await axios.post("http://localhost:4000/loans/loans", { id });
                console.log(data)
                setLoans(data);
                console.log("Loans Data:", data);
            } catch (err) {
                console.error("Error Fetching Loans:", err);
                setError("Failed to fetch loans. Please try again later.");
                setTimeout(() => setError(""), 4000);
            }
        };

        fetchLoans();
    }, []);


    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/");
        }
    }, [router]);

    return (
        <div className="p-10 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
           
            <div className="text-left mb-8">
                <Link
                    href={"/"}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105"
                >
                    Back to Home
                </Link>
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
                Loan Information
            </h1>

            {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg mb-8 shadow-md text-center">
                    <p className="font-medium">{error}</p>
                </div>
            )}

            {loans.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {loans.map((loan: Loan, index: number) => (
                        <li
                            key={index}
                            className="bg-white shadow-xl rounded-lg p-8 border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
                        >
                            <div className="mb-5">
                                <p className="text-gray-800 text-lg font-medium">
                                    <span className="font-semibold">Date:</span>{" "}
                                    {new Date(loan.createdAt).toLocaleDateString()}{" "}
                                    <span className="text-gray-500 text-sm">
                                        ({new Date(loan.createdAt).toLocaleTimeString()})
                                    </span>
                                </p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold">Loan Category:</span> {loan.category}
                                </p>
                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold">Sub Category:</span> {loan.subcategory}
                                </p>
                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold">Desired Loan:</span> {loan.maxLoanAmount}
                                </p>
                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold">Loan Amount:</span>{" "}
                                    <span className="text-green-600 font-bold">
                                        PKR {loan.remainingAmount.toLocaleString()}
                                    </span>
                                </p>
                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold">Monthly Payment:</span>{" "}
                                    <span className="text-blue-600 font-bold">
                                        PKR {loan.monthlyInstallment.toLocaleString()}
                                    </span>
                                </p>
                                <p className="text-gray-700 text-md">
                                    <span className="font-semibold">Years:</span> {loan.paymentPeriod}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && (
                    <p className="text-gray-600 text-center mt-16 text-lg font-medium">
                        Loading loans...
                    </p>
                )
            )}
        </div>




    );
}
