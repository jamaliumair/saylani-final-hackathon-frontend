"use client";

import useAuthStore from "@/store/authstore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Register() {
    const [cnic, setCnic] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const setUser = useAuthStore((state) => state.setUser);
    const [errors, setErrors] = useState<{ cnic?: string; email?: string; name?: string }>({});

    const router = useRouter();

    const validateForm = () => {
        const newErrors: { cnic?: string; email?: string; name?: string } = {};


        if (!/^\d{13}$/.test(cnic)) {
            newErrors.cnic = "CNIC must be exactly 13 digits.";
        }


        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }


        if (!name) {
            newErrors.name = "Name cannot be empty.";
        }

        setErrors(newErrors);


        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async () => {
        if (validateForm()) {
            try {
                const { data } = await axios.post('http://localhost:4000/auth/register', { email, cnic, name,address: "karachi", phoneNumber:"03128" });
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data);

                setUser(data);

                console.log(`User created`, data.data.user._id);
                localStorage.setItem("userActive", JSON.stringify(data.data.user._id))
                router.push("/");
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Validation failed, errors:", errors);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/");
        }
    }, [router]);


    return (
        <div className="bg-black bg-opacity-50 flex justify-center items-center z-50 p-6">
            <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-screen overflow-y-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">Proceed with Application</h2>

                <div>
                    <label htmlFor="cnic" className="block mb-2 font-medium text-gray-700">
                        CNIC
                    </label>
                    <input
                        type="text"
                        id="cnic"
                        name="cnic"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.cnic && <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>}
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="mt-4">
                    <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onSubmit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>

    );
}
