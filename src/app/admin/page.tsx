// AdminPanel.tsx
"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import mongoose from "mongoose";

export interface Loan {
    _id: string;
    userId: mongoose.Types.ObjectId;
    category: string;
    subcategory: string;
    createdAt: Date;
    maxLoanAmount: number;
    remainingAmount: number;
    depositAmount: number;
    paymentPeriod: number;
    monthlyInstallment: number;
    guarantors: {
      name: string;
      email: string;
      location: string;
      cnic: string;
    }[];
    documents: {
      salarySlip?: string;
      bankStatement?: string;
    };
    appointment: {
      date: Date;
      time: string;
      officeLocation: string;
    };
    tokenNumber?: string;
    qrCode?: string;
  }

const AdminPanel = () => {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/loans", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setLoans(response.data);
            } catch (err) {
                setError("Failed to fetch loans.");
                console.log(err);
            }
        };
        fetchLoans();
    }, []);

    const handleDelete = async (loanId: string) => {
        try {
            await axios.delete(`http://localhost:5000/admin/loans/${loanId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setLoans(loans.filter((loan) => loan._id !== loanId));
        } catch (err) {
            setError("Failed to delete loan.");
            console.log(err);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
            {error && <p className="text-red-600">{error}</p>}

            <ul className="space-y-4">
                {loans.map((loan) => (
                    <li key={loan._id} className="bg-white p-4 rounded shadow-md">
                        <p><strong>Loan Amount:</strong> {loan.remainingAmount}</p>
                        <p><strong>Loan Category:</strong> {loan.category}</p>
                        <button
                            onClick={() => handleDelete(loan._id)}
                            className="bg-red-600 text-white px-4 py-2 rounded mt-2 hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
