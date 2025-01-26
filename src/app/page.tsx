import Footer from "@/components/Footer";
import Header from "@/components/Header";

import LoanCategories from "@/components/LoanCategories";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">Financial Support for Your Needs</h1>
        <LoanCategories />
        
      </main>
      <Footer />
      
    </div>
  )
}