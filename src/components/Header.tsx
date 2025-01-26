import Link from "next/link"

export default function Header() {
    return (
        <header className="bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-3xl font-semibold tracking-wide">
                    LoanSupport
                </Link>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/loancalculator" className="text-lg hover:text-blue-400 transition-colors duration-300">
                                Add Loan
                            </Link>
                        </li>
                        <li>
                            <Link href="/yourLoans" className="text-lg hover:text-blue-400 transition-colors duration-300">
                                Your Loans
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
