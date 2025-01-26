"use client"

import { useState, useEffect } from "react"

import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"



interface LoanCategory {
    name: string
    subcategories: string[]
    maxLoan: number
    period: number
}

interface LoanBreakdown {
    category: string
    subcategory: string
    desiredLoan: number
    deposit: number
    loanAmount: number
    monthlyPayment: number
    period: number
}

interface Errors {
    category?: string
    subcategory?: string
    desiredLoanAmount?: string
    initialDeposit?: string
    loanPeriod?: string
}

const loanCategories: LoanCategory[] = [
    {
        name: "Wedding Loans",
        subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
        maxLoan: 500000,
        period: 3,
    },
    {
        name: "Home Construction Loans",
        subcategories: ["Structure", "Finishing", "Loan"],
        maxLoan: 1000000,
        period: 5,
    },
    {
        name: "Business Startup Loans",
        subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
        maxLoan: 1000000,
        period: 5,
    },
    {
        name: "Education Loans",
        subcategories: ["University Fees", "Child Fees Loan"],
        maxLoan: 1000000,
        period: 4,
    },
]

export default function LoanCalculator() {
    const [category, setCategory] = useState<string>("")
    const [subcategory, setSubcategory] = useState<string>("")
    const [initialDeposit, setInitialDeposit] = useState<string>("")
    const [loanPeriod, setLoanPeriod] = useState<string>("")
    const [loanBreakdown, setLoanBreakdown] = useState<LoanBreakdown | null>(null)
    const [maxLoanPeriod, setMaxLoanPeriod] = useState<number>(5)
    const [maxLoanAmount, setMaxLoanAmount] = useState<number>(0)
    const [initialDepositOptions, setInitialDepositOptions] = useState<number[]>([])
    const [errors, setErrors] = useState<Errors>({})
    const [desiredLoanAmount, setDesiredLoanAmount] = useState<string>("")
    const [token, setToken] = useState<string | null>(null);



    useEffect(() => {


        if (category) {
            const selectedCategory = loanCategories.find((cat) => cat.name === category)
            if (selectedCategory) {
                setMaxLoanPeriod(selectedCategory.period)
                setMaxLoanAmount(selectedCategory.maxLoan)
                setLoanPeriod("")


                const depositOptions = [0]
                for (let i = 1; i <= 10; i++) {
                    depositOptions.push(Math.round(selectedCategory.maxLoan * (i * 0.1)))
                }
                depositOptions.push(1000000)
                console.log(initialDepositOptions)
                setInitialDepositOptions([...new Set(depositOptions)].sort((a, b) => a - b))
                setInitialDeposit("")
            }
        }
    }, [category, initialDepositOptions])

    const validateForm = (): boolean => {
        const newErrors: Errors = {}
        if (!category) newErrors.category = "Please select a loan category"
        if (!subcategory) newErrors.subcategory = "Please select a subcategory"
        if (!desiredLoanAmount) newErrors.desiredLoanAmount = "Please enter the desired loan amount"
        if (!initialDeposit) newErrors.initialDeposit = "Please enter the initial deposit"
        if (!loanPeriod) newErrors.loanPeriod = "Please select a loan period"

        const desiredLoan = Number.parseInt(desiredLoanAmount) || 0
        const deposit = Number.parseInt(initialDeposit) || 0

        if (desiredLoan > maxLoanAmount) {
            newErrors.desiredLoanAmount = `Desired loan amount cannot exceed ${maxLoanAmount.toLocaleString()} PKR`
        }
        if (deposit > desiredLoan) {
            newErrors.initialDeposit = "Initial deposit cannot exceed the desired loan amount"
        }
        if (Number.parseInt(loanPeriod) > maxLoanPeriod) {
            newErrors.loanPeriod = `Loan period cannot exceed ${maxLoanPeriod} years for this category`
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const desiredLoan = Number.parseInt(desiredLoanAmount)
    const deposit = Number.parseInt(initialDeposit)
    const period = Number.parseInt(loanPeriod)
    const loanAmount = desiredLoan - deposit
    const monthlyPayment = loanAmount / (period * 12)


    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return


        console.log(category, "+",
            subcategory,
            desiredLoan,
            deposit,
            loanAmount,
            monthlyPayment,
            period,);


        setLoanBreakdown({
            category,
            subcategory,
            desiredLoan,
            deposit,
            loanAmount,
            monthlyPayment,
            period,
        })
    }

    const handleFieldChange = (field: string, value: string) => {
        setErrors((prev) => ({ ...prev, [field]: "" }))
        switch (field) {
            case "category":
                setCategory(value)
                setSubcategory("")
                setDesiredLoanAmount("")
                setInitialDeposit("")
                break
            case "subcategory":
                setSubcategory(value)
                break
            case "desiredLoanAmount":
                setDesiredLoanAmount(value)
                if (Number.parseInt(value) > maxLoanAmount) {
                    setErrors((prev) => ({
                        ...prev,
                        desiredLoanAmount: `Desired loan amount cannot exceed ${maxLoanAmount.toLocaleString()} PKR`,
                    }))
                }
                break
            case "initialDeposit":
                setInitialDeposit(value)
                if (Number.parseInt(value) > Number.parseInt(desiredLoanAmount)) {
                    setErrors((prev) => ({ ...prev, initialDeposit: "Initial deposit cannot exceed the desired loan amount" }))
                }
                break
            case "loanPeriod":
                setLoanPeriod(value)
                if (Number.parseInt(value) > maxLoanPeriod) {
                    setErrors((prev) => ({
                        ...prev,
                        loanPeriod: `Loan period cannot exceed ${maxLoanPeriod} years for this category`,
                    }))
                }
                break
        }
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
          let storedUser = localStorage.getItem("userActive");
          if (storedUser) {
            storedUser = JSON.parse(storedUser);
            // Handle user data if needed
          }
        }
      }, []);

    const router = useRouter();

    const handleCalculation = async () => {
        try {
            const { data } = await axios.post('http://localhost:4000/loan/loan-requests', {
                category,
                subcategory,
                desiredLoan,
                deposit,
                loanAmount,
                monthlyPayment,
                period,
            });

            console.log(`loan created`, data);

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/register");
        }
    }, [router]);


    return (
        <section id="calculator" className="bg-white shadow-lg rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold mb-8 text-gray-900 text-center">
                Loan Calculator
            </h2>
            <form onSubmit={handleCalculate} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="category" className="block text-lg font-medium text-gray-700">
                        Loan Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => handleFieldChange("category", e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.category ? "border-red-500" : ""}`}
                        required
                    >
                        <option value="">Select a category</option>
                        {loanCategories.map((cat, index) => (
                            <option key={index} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {category && (
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>Maximum loan amount: {maxLoanAmount.toLocaleString()} PKR</p>
                        <p>Maximum loan period: {maxLoanPeriod} years</p>
                    </div>
                )}

                <div className="space-y-2">
                    <label htmlFor="subcategory" className="block text-lg font-medium text-gray-700">
                        Subcategory
                    </label>
                    <select
                        id="subcategory"
                        value={subcategory}
                        onChange={(e) => handleFieldChange("subcategory", e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.subcategory ? "border-red-500" : ""}`}
                        required
                    >
                        <option value="">Select a subcategory</option>
                        {category &&
                            loanCategories
                                .find((cat) => cat.name === category)
                                ?.subcategories.map((sub, index) => (
                                    <option key={index} value={sub}>
                                        {sub}
                                    </option>
                                ))}
                    </select>
                    {errors.subcategory && <p className="text-red-500 text-sm mt-1">{errors.subcategory}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="desiredLoanAmount" className="block text-lg font-medium text-gray-700">
                        Desired Loan Amount (PKR)
                    </label>
                    <input
                        type="number"
                        id="desiredLoanAmount"
                        value={desiredLoanAmount}
                        onChange={(e) => handleFieldChange("desiredLoanAmount", e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.desiredLoanAmount ? "border-red-500" : ""}`}
                        required
                    />
                    {errors.desiredLoanAmount && <p className="text-red-500 text-sm mt-1">{errors.desiredLoanAmount}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="initialDeposit" className="block text-lg font-medium text-gray-700">
                        Initial Deposit (PKR)
                    </label>
                    <input
                        type="number"
                        id="initialDeposit"
                        value={initialDeposit}
                        onChange={(e) => handleFieldChange("initialDeposit", e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.initialDeposit ? "border-red-500" : ""}`}
                        required
                    />
                    {errors.initialDeposit && <p className="text-red-500 text-sm mt-1">{errors.initialDeposit}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="loanPeriod" className="block text-lg font-medium text-gray-700">
                        Loan Period (Years)
                    </label>
                    <select
                        id="loanPeriod"
                        value={loanPeriod}
                        onChange={(e) => handleFieldChange("loanPeriod", e.target.value)}
                        className={`w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.loanPeriod ? "border-red-500" : ""}`}
                        required
                    >
                        <option value="">Select a period</option>
                        {Array.from({ length: maxLoanPeriod }).map((_, index) => (
                            <option key={index} value={index + 1}>
                                {index + 1} Year
                            </option>
                        ))}
                    </select>
                    {errors.loanPeriod && <p className="text-red-500 text-sm mt-1">{errors.loanPeriod}</p>}
                </div>

                <button
                    type="submit"
                    onClick={handleCalculation}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                    Calculate Loan
                </button>
            </form>

            {loanBreakdown && (
                <div className="mt-8 p-8 bg-gray-100 rounded-lg shadow-xl">
                    <h3 className="text-2xl font-semibold text-gray-900">Loan Breakdown</h3>
                    <div className="mt-4 space-y-3 text-lg text-gray-700">
                        <p><strong>Category:</strong> {loanBreakdown.category}</p>
                        <p><strong>Subcategory:</strong> {loanBreakdown.subcategory}</p>
                        <p><strong>Desired Loan:</strong> {loanBreakdown.desiredLoan.toLocaleString()} PKR</p>
                        <p><strong>Initial Deposit:</strong> {loanBreakdown.deposit.toLocaleString()} PKR</p>
                        <p><strong>Loan Amount:</strong> {loanBreakdown.loanAmount.toLocaleString()} PKR</p>
                        <p><strong>Loan Period:</strong> {loanBreakdown.period} years</p>
                        <p><strong>Monthly Payment:</strong> {loanBreakdown.monthlyPayment.toLocaleString()} PKR</p>
                    </div>
                    {token ? (
                        <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all">
                            Submit
                        </button>
                    ) : (
                        <Link
                            href={"/register"}
                            className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all"
                        >
                            Proceed
                        </Link>
                    )}
                </div>
            )}
        </section>

    )
}
