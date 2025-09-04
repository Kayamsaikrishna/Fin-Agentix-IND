import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HelpCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';

// Reusable Header Component
const SupportHeader = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
          <Link to="/loans" className="flex items-center text-blue-600">
            <ShieldCheck className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">Fin-Agentix</span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/loans" className="text-gray-600 hover:text-blue-600 font-medium">Loans</Link>
            <Link to="/profile" className="text-gray-600 hover:text-blue-600 font-medium">Profile</Link>
            <Link to="/settings" className="text-gray-600 hover:text-blue-600 font-medium">Settings</Link>
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

// Reusable Footer Component
const SupportFooter = () => (
    <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; {new Date().getFullYear()} Fin-Agentix India. All Rights Reserved.</p>
        </div>
    </footer>
);

// FAQ Item Component
const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
            >
                <span>{question}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

// Main Support Page Component
const Support: React.FC = () => {
    const faqs = [
        { question: "How long does the loan approval process take?", answer: "Our AI-powered platform aims to provide a decision within 24 hours for over 80% of applications. Complex cases, like high-value business loans, may take slightly longer." },
        { question: "What documents are required to apply for a loan?", answer: "Typically, you will need your Aadhaar card for eKYC, your PAN card for verification, and recent salary slips or bank statements for income proof. The specific documents vary by loan type." },
        { question: "Can I track my application status?", answer: "Yes! Once you submit your application, you can track its real-time status on your personal dashboard, from verification to disbursal." },
        { question: "Is my data secure with Fin-Agentix?", answer: "Absolutely. We use bank-grade encryption and adhere to all RBI guidelines for data security and privacy. Your data is stored securely in India." },
    ];
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <SupportHeader />
        <main className="flex-grow">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <HelpCircle className="mx-auto h-12 w-12 text-blue-600" />
                    <h1 className="mt-4 text-4xl font-extrabold text-gray-900">Support Center</h1>
                    <p className="mt-2 text-lg text-gray-600">We're here to help. Find answers to your questions or get in touch with our team.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* FAQ Section */}
                    <div className="bg-white p-8 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <FaqItem key={index} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>

                    {/* Contact Form & Details Section */}
                    <div className="space-y-8">
                         <div className="bg-white p-8 rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input type="email" name="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea name="message" id="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-md flex justify-around text-center">
                           <div className="flex flex-col items-center">
                                <Phone className="w-8 h-8 text-blue-600 mb-2"/>
                                <h3 className="font-semibold text-gray-800">Call Us</h3>
                                <p className="text-gray-600">+91 1800 123 4567</p>
                           </div>
                            <div className="flex flex-col items-center">
                                <Mail className="w-8 h-8 text-blue-600 mb-2"/>
                                <h3 className="font-semibold text-gray-800">Email Us</h3>
                                <p className="text-gray-600">support@fin-agentix.in</p>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <SupportFooter />
    </div>
  );
};

export default Support;

