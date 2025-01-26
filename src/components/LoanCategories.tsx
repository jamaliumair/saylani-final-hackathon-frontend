
const loanCategories = [
    {
        name: "Wedding Loans",
        subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
        maxLoan: "5 Lakh",
        period: "3 years",
    },
    {
        name: "Home Construction Loans",
        subcategories: ["Structure", "Finishing", "Loan"],
        maxLoan: "10 Lakh",
        period: "5 years",
    },
    {
        name: "Business Startup Loans",
        subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
        maxLoan: "10 Lakh",
        period: "5 years",
    },
    {
        name: "Education Loans",
        subcategories: ["University Fees", "Child Fees Loan"],
        maxLoan: "Based on requirement",
        period: "4 years",
    },
]

export default function LoanCategories() {
    return (
        <section id="categories" className="py-16 bg-gray-50">
            <h2 className="text-4xl font-semibold mb-8 text-gray-900 text-center">
                Loan Categories
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {loanCategories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-blue-600">{category.name}</h3>
                        <ul className="list-disc list-inside mb-4 text-gray-700">
                            {category.subcategories.map((sub, subIndex) => (
                                <li key={subIndex} className="text-gray-600">{sub}</li>
                            ))}
                        </ul>
                        <div className="text-gray-800">
                            <p>
                                <strong className="font-medium">Maximum loan:</strong> PKR {category.maxLoan}
                            </p>
                            <p>
                                <strong className="font-medium">Loan period:</strong> {category.period} years
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="text-center mt-8">
                <Link
                    href="/loancalculator"
                    className="px-8 py-4 bg-blue-600 text-2xl text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                >
                    Click Here for Loan Calculator
                </Link>
            </div> */}
        </section>

    )
}

