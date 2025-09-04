import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Home, Car, Briefcase, GraduationCap, Leaf, 
  Users, HeartPulse, CreditCard, Bike, Smartphone, Gem, ShieldCheck 
} from 'lucide-react';

// --- Reusable Header Component ---
const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-50">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <Link to="/loans" className="flex items-center text-blue-600">
            <ShieldCheck className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">Fin-Agentix</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">About Us</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">Contact</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">FAQs</a>
        </div>
        <div className="flex items-center">
            <Link to="/login" className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">
                Login
            </Link>
        </div>
      </div>
    </nav>
  </header>
);

// --- Reusable Footer Component ---
const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Products</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400">Personal Loan</a></li>
                        <li><a href="#" className="hover:text-blue-400">Home Loan</a></li>
                        <li><a href="#" className="hover:text-blue-400">Business Loan</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                        <li><a href="#" className="hover:text-blue-400">Press</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                        <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
                        <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                    </ul>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold mb-4">Fin-Agentix</h3>
                    <p className="text-gray-400">India's AI-powered digital lending platform, making finance accessible to all.</p>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Fin-Agentix India. All Rights Reserved.
            </div>
        </div>
    </footer>
);


// --- Main Loans Page ---

// Define the structure for a single loan type. Amount is now optional.
interface Loan {
  icon: React.ElementType;
  title: string;
  amount?: string; // Made amount optional
  description: string;
}

// Data for all 12 loan sectors. The 'amount' property has been removed.
// It will be added later from an admin panel via an API.
const loanData: Loan[] = [
  { icon: User, title: 'Personal Loans', description: 'For weddings, travel, emergencies, and more.' },
  { icon: Home, title: 'Home Loans', description: 'Purchase or construct your dream home.' },
  { icon: Car, title: 'Vehicle Loans', description: 'Finance cars and commercial vehicles.' },
  { icon: Briefcase, title: 'Business/MSME Loans', description: 'For working capital, expansion, and equipment.' },
  { icon: Gem, title: 'Gold Loans', description: 'Instant cash against your gold jewelry.' },
  { icon: GraduationCap, title: 'Education Loans', description: 'Fund higher education in India or abroad.' },
  { icon: Leaf, title: 'Agricultural Loans', description: 'For crop cultivation, equipment, and livestock.' },
  { icon: Users, title: 'Microfinance', description: 'Empowering small entrepreneurs and rural groups.' },
  { icon: CreditCard, title: 'Credit Cards', description: 'For daily expenses, shopping, and travel.' },
  { icon: Bike, title: 'Two-Wheeler Loans', description: 'Quick financing for motorcycles and scooters.' },
  { icon: HeartPulse, title: 'Healthcare Loans', description: 'Cover medical emergencies and planned procedures.' },
  { icon: Smartphone, title: 'Digital/Fintech Loans', description: 'Short-term funding for gig workers.' }
];

// Reusable Loan Card Component
const LoanCard: React.FC<{ loan: Loan }> = ({ loan }) => {
  const Icon = loan.icon;
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-blue-500">
      <div className="mx-auto bg-blue-100 rounded-full p-4 mb-4">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{loan.title}</h3>
      {/* Conditionally render the amount only if it exists */}
      {loan.amount && (
        <p className="text-lg font-semibold text-gray-600 mb-3">{loan.amount}</p>
      )}
      <p className="text-gray-500 mb-6 flex-grow">{loan.description}</p>
      <button className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
        Apply Now
      </button>
    </div>
  );
};

// Main Loans Page Component
const Loans: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
            <div className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
                            Financial Solutions for Every Aspiration
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                            Discover a wide range of AI-powered loan products, tailored for the diverse needs of India.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {loanData.map((loan, index) => (
                            <LoanCard key={index} loan={loan} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
};

export default Loans;

