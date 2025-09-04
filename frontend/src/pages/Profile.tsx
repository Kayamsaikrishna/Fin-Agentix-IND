import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, User, Mail, Phone, Calendar, CheckCircle2, XCircle, Hourglass, 
  Landmark, Banknote, TrendingUp, FileText, Edit, LogOut, Settings, Upload
} from 'lucide-react';

// --- Reusable Components (assuming they are in shared files) ---
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
        <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-700">Welcome, Anjali!</span>
            <Link to="/profile" title="Profile"><Settings className="w-6 h-6 text-gray-600 hover:text-blue-600"/></Link>
            <Link to="/login" title="Logout"><LogOut className="w-6 h-6 text-gray-600 hover:text-blue-600"/></Link>
        </div>
      </div>
    </nav>
  </header>
);

const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Fin-Agentix India. All Rights Reserved.
        </div>
    </footer>
);

// --- Mock Data Simulation ---
const userProfileData = {
    studentDetails: {
        fullName: "Anjali Sharma",
        dob: "15-08-2003",
        gender: "Female",
        aadhaar: "XXXX-XXXX-8765",
        mobile: "+91 98XXXXXX01",
        email: "anjali.s@example.com",
        profilePhotoUrl: "https://placehold.co/128x128/EBF4FF/3B82F6?text=AS" // Placeholder image
    },
    guardianDetails: {
        name: "Rajesh Sharma",
        relation: "Father",
        pan: "ABCDE1234F",
        employment: "Salaried",
        annualIncome: "₹12,00,000"
    },
    educationDetails: {
        university: "IIT Bombay",
        course: "B.Tech in Computer Science",
        duration: "4 Years",
        totalFees: "₹8,50,000"
    }
};

const loanApplicationData = {
    applicationId: "EDU-2025-84321",
    status: "Approved", // Can be "Approved", "Pending", "Rejected"
    aiRiskScore: 82, // Score out of 100
    kyc: {
        aadhaar: "Verified",
        pan: "Verified",
        itr: "Verified"
    },
    loanOffers: [
        { bank: "HDFC Bank", amount: "₹7,00,000", interest: "8.5%", tenure: "5 years", emi: "₹14,525" },
        { bank: "State Bank of India", amount: "₹7,50,000", interest: "8.2%", tenure: "7 years", emi: "₹11,320" },
        { bank: "ICICI Bank", amount: "₹6,50,000", interest: "8.9%", tenure: "5 years", emi: "₹13,530" },
    ],
    repayment: {
        totalAmount: "₹7,00,000",
        paid: "₹58,100",
        remaining: "₹6,41,900",
        emi: "₹14,525",
        nextDueDate: "05 Oct 2025",
        paymentsMade: 4,
        totalPayments: 60
    }
};

// --- Child Components for the Dashboard ---

const ProfileHeader = ({ user, appId }) => (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex items-center space-x-6">
        <div className="flex-shrink-0 relative">
            <img 
                className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover" 
                src={user.profilePhotoUrl} 
                alt="Profile Photo" 
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 hover:bg-blue-700 transition">
                <Upload className="w-4 h-4" />
            </button>
        </div>
        <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
            <p className="text-gray-500">Application ID: {appId}</p>
        </div>
    </div>
);


const KycStatusCard = ({ kyc }) => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">KYC Verification</h3>
        <ul className="space-y-3">
            <li className="flex items-center justify-between">
                <span className="text-gray-600">Aadhaar Verification</span>
                <span className="flex items-center text-green-600 font-semibold"><CheckCircle2 className="w-5 h-5 mr-2"/> {kyc.aadhaar}</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="text-gray-600">PAN Verification</span>
                <span className="flex items-center text-green-600 font-semibold"><CheckCircle2 className="w-5 h-5 mr-2"/> {kyc.pan}</span>
            </li>
            <li className="flex items-center justify-between">
                <span className="text-gray-600">Income Tax (ITR)</span>
                <span className="flex items-center text-green-600 font-semibold"><CheckCircle2 className="w-5 h-5 mr-2"/> {kyc.itr}</span>
            </li>
        </ul>
    </div>
);

const LoanEligibilityCard = ({ status, score }) => {
    const getStatusInfo = () => {
        switch(status) {
            case "Approved": return { text: "Congratulations! Approved", color: "text-green-600", icon: <CheckCircle2/> };
            case "Pending": return { text: "Under Review", color: "text-yellow-600", icon: <Hourglass/> };
            case "Rejected": return { text: "Application Rejected", color: "text-red-600", icon: <XCircle/> };
            default: return { text: "Unknown", color: "text-gray-600", icon: <User/> };
        }
    };
    const statusInfo = getStatusInfo();

    return (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Loan Eligibility</h3>
            <div className={`text-2xl font-bold ${statusInfo.color} flex items-center justify-center mb-4`}>
                {statusInfo.icon}
                <span className="ml-2">{statusInfo.text}</span>
            </div>
            <p className="text-gray-600">Based on our AI-powered assessment, your profile risk score is:</p>
            <p className="text-4xl font-bold text-blue-600 my-2">{score}<span className="text-xl">/100</span></p>
        </div>
    );
};

const LoanOffersCard = ({ offers }) => (
    <div className="bg-white p-6 rounded-xl shadow-md col-span-1 md:col-span-2">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Loan Offers</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {offers.map((offer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 text-center hover:border-blue-500 hover:shadow-lg transition">
                    <h4 className="font-bold text-gray-700">{offer.bank}</h4>
                    <p className="text-2xl font-bold text-blue-600 my-2">{offer.amount}</p>
                    <p className="text-sm text-gray-500">@ {offer.interest} p.a.</p>
                    <p className="text-sm text-gray-500">EMI: {offer.emi}/month</p>
                    <button className="mt-4 w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Accept Offer
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const RepaymentTrackerCard = ({ repayment }) => {
    const progress = (repayment.paymentsMade / repayment.totalPayments) * 100;
    return (
        <div className="bg-white p-6 rounded-xl shadow-md col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Repayment Tracker</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                    <p className="text-gray-500 text-sm">Next EMI Due</p>
                    <p className="font-bold text-gray-800">{repayment.nextDueDate}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Amount Paid</p>
                    <p className="font-bold text-green-600">{repayment.paid}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm">Remaining</p>
                    <p className="font-bold text-red-600">{repayment.remaining}</p>
                </div>
                 <div>
                    <p className="text-gray-500 text-sm">Payments Made</p>
                    <p className="font-bold text-gray-800">{repayment.paymentsMade}/{repayment.totalPayments}</p>
                </div>
            </div>
        </div>
    );
};

const ProfileDetailsSection = ({ profile }) => (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Application Details</h2>
            <button className="flex items-center text-blue-600 font-semibold hover:underline">
                <Edit className="w-5 h-5 mr-2"/> Edit Application
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Details */}
            <div>
                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Student Details</h4>
                <p><strong>Full Name:</strong> {profile.studentDetails.fullName}</p>
                <p><strong>Date of Birth:</strong> {profile.studentDetails.dob}</p>
                <p><strong>Aadhaar:</strong> {profile.studentDetails.aadhaar}</p>
                <p><strong>Mobile:</strong> {profile.studentDetails.mobile}</p>
                <p><strong>Email:</strong> {profile.studentDetails.email}</p>
            </div>
            {/* Guardian Details */}
            <div>
                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Guardian Details</h4>
                <p><strong>Name:</strong> {profile.guardianDetails.name}</p>
                <p><strong>Relation:</strong> {profile.guardianDetails.relation}</p>
                <p><strong>PAN:</strong> {profile.guardianDetails.pan}</p>
                <p><strong>Income:</strong> {profile.guardianDetails.annualIncome}</p>
            </div>
             {/* Education Details */}
            <div>
                <h4 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Education & Loan</h4>
                <p><strong>University:</strong> {profile.educationDetails.university}</p>
                <p><strong>Course:</strong> {profile.educationDetails.course}</p>
                <p><strong>Total Fees:</strong> {profile.educationDetails.totalFees}</p>
                <p><strong>Applied For:</strong> {loanApplicationData.repayment.totalAmount}</p>
            </div>
        </div>
    </div>
);


// --- Main Profile Page Component ---
const Profile: React.FC = () => {
    const { status, aiRiskScore, kyc, loanOffers, repayment, applicationId } = loanApplicationData;
    const { studentDetails } = userProfileData;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <ProfileHeader user={studentDetails} appId={applicationId} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Dashboard Cards */}
                        <LoanEligibilityCard status={status} score={aiRiskScore} />
                        <KycStatusCard kyc={kyc} />
                        {status === "Approved" && <LoanOffersCard offers={loanOffers} />}
                        {status === "Approved" && <RepaymentTrackerCard repayment={repayment} />}
                    </div>

                    {/* Full Profile Details Section */}
                    <ProfileDetailsSection profile={userProfileData} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;

