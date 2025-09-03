import React, { useState, useEffect } from 'react';
import { Mail, Phone, Shield, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft, Lock, Key, Smartphone, User, Building, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import FinAgentixLogo from '../../assets/fin-agentix-logo.jpeg';

interface RecoveryData {
  email: string;
  phoneNumber: string;
  otp: string;
  securityAnswer: string;
  newPassword: string;
  confirmPassword: string;
  captcha: string;
}

interface SecurityQuestion {
  id: string;
  question: string;
}

interface RecoveryError {
  [key: string]: string;
}

const ForgotPassword: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [step, setStep] = useState<'identify' | 'verify' | 'security_questions' | 'reset_password' | 'success'>('identify');
  const [recoveryMethod, setRecoveryMethod] = useState<'email' | 'phone' | 'both'>('email');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [maxAttempts] = useState(3);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [recoveryData, setRecoveryData] = useState<RecoveryData>({
    email: '',
    phoneNumber: '',
    otp: '',
    securityAnswer: '',
    newPassword: '',
    confirmPassword: '',
    captcha: ''
  });

  const [errors, setErrors] = useState<RecoveryError>({});
  const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<SecurityQuestion | null>(null);
  const [captchaRequired, setCaptchaRequired] = useState(false);

  const availableSecurityQuestions: SecurityQuestion[] = [
    { id: '1', question: 'What was the name of your first pet?' },
    { id: '2', question: 'In which city were you born?' },
    { id: '3', question: 'What is your mother\'s maiden name?' },
    { id: '4', question: 'What was the name of your first school?' },
    { id: '5', question: 'What is your favorite movie?' }
  ];

  const generateCaptcha = (): string => {
    const chars = 'ABCDEHKMNP23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  useEffect(() => {
    const calculatePasswordStrength = (password: string) => {
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password)) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;
      return strength;
    };
    
    setPasswordStrength(calculatePasswordStrength(recoveryData.newPassword));
  }, [recoveryData.newPassword]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecoveryData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: RecoveryError = {};
    if (step === 'identify') {
        if ((recoveryMethod === 'email' || recoveryMethod === 'both') && (!recoveryData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recoveryData.email))) newErrors.email = 'Valid email is required';
        if ((recoveryMethod === 'phone' || recoveryMethod === 'both') && (!recoveryData.phoneNumber || !/^[6-9]\d{9}$/.test(recoveryData.phoneNumber))) newErrors.phoneNumber = 'Valid 10-digit mobile number is required';
        if (captchaRequired && !recoveryData.captcha) newErrors.captcha = 'Captcha is required';
    } else if (step === 'verify') {
        if (!recoveryData.otp || recoveryData.otp.length !== 6) newErrors.otp = 'A 6-digit OTP is required';
    } else if (step === 'security_questions') {
        if (!recoveryData.securityAnswer.trim() || recoveryData.securityAnswer.length < 2) newErrors.securityAnswer = 'Answer must be at least 2 characters';
    } else if (step === 'reset_password') {
        if (!recoveryData.newPassword || recoveryData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
        else if (passwordStrength < 3) newErrors.newPassword = 'Password is too weak';
        if (recoveryData.newPassword !== recoveryData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (step === 'identify') {
        if (Math.random() < 0.1) {
            setErrors({ general: 'No account found. Please check your details.' });
            setCaptchaRequired(true); setAttemptCount(prev => prev + 1);
        } else {
            const randomQuestions = availableSecurityQuestions.sort(() => 0.5 - Math.random()).slice(0, 1);
            setSecurityQuestions(randomQuestions); setSelectedQuestion(randomQuestions[0]);
            setOtpSent(true); setStep('verify'); setResendCooldown(30);
        }
    } else if (step === 'verify') {
        setStep('security_questions');
    } else if (step === 'security_questions') {
        setStep('reset_password');
    } else if (step === 'reset_password') {
        setStep('success');
    }
    setIsLoading(false);
  };

  const resendOTP = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setResendCooldown(30);
    alert('OTP resent successfully!');
    setIsLoading(false);
  };
  
  const getPasswordStrengthColor = () => { if (passwordStrength <= 2) return 'bg-red-500'; if (passwordStrength <= 3) return 'bg-yellow-500'; if (passwordStrength <= 4) return 'bg-blue-500'; return 'bg-green-500'; };
  const getPasswordStrengthText = () => { if (passwordStrength <= 2) return 'Weak'; if (passwordStrength <= 3) return 'Fair'; if (passwordStrength <= 4) return 'Good'; return 'Strong'; };
  const resetForm = () => { setStep('identify'); setRecoveryData({ email: '', phoneNumber: '', otp: '', securityAnswer: '', newPassword: '', confirmPassword: '', captcha: '' }); setErrors({}); setAttemptCount(0); setOtpSent(false); setCaptchaRequired(false); setSelectedQuestion(null); };

  const STEPS = [ { id: 'identify', label: 'Identify' }, { id: 'verify', label: 'Verify' }, { id: 'security_questions', label: 'Security' }, { id: 'reset_password', label: 'Reset' } ];
  const currentStepIndex = STEPS.findIndex(s => s.id === step);

  const getStepTitle = () => {
    switch(step) {
      case 'identify': return 'Recover Your Account'; case 'verify': return 'Verify Your Identity';
      case 'security_questions': return 'Answer Security Question'; case 'reset_password': return 'Create New Password';
      case 'success': return 'Password Reset Successfully'; default: return 'Reset Password';
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-start justify-center p-12 bg-slate-100 border-r border-slate-200">
          <div className="space-y-4 animate-slideUp">
            <img src={FinAgentixLogo} alt="Fin-Agentix Logo" className="w-16 h-16 rounded-lg shadow-md"/>
            <h1 className="text-5xl font-bold tracking-tighter text-slate-900">Locked Out? <br/><span className="text-blue-600">Let's Get You Back In.</span></h1>
            <p className="text-lg text-slate-600 max-w-lg">Follow the secure steps to regain access to your Fin-Agentix account.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-lg space-y-6 animate-fadeIn">
            <div className="text-center"><h2 className="text-3xl font-bold text-slate-900">{getStepTitle()}</h2></div>
            <div className="card">
              {step !== 'success' && (
                <div className="flex items-center mb-8">
                  {STEPS.map((s, index) => (
                    <React.Fragment key={s.id}>
                      <div className="flex flex-col items-center text-center w-24">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${currentStepIndex >= index ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{currentStepIndex > index ? <Check/> : index + 1}</div>
                        <p className={`mt-2 text-xs font-medium ${currentStepIndex >= index ? 'text-slate-700' : 'text-slate-400'}`}>{s.label}</p>
                      </div>
                      {index < STEPS.length - 1 && <div className={`flex-1 h-1 transition-colors ${currentStepIndex > index ? 'bg-blue-600' : 'bg-slate-200'}`}></div>}
                    </React.Fragment>
                  ))}
                </div>
              )}
              <form onSubmit={handleStepSubmit} className="space-y-6">
                {errors.general && <div className="notification notification-error"><p>{errors.general}</p></div>}
                
                {step === 'identify' && (
                  <>
                    {activeTab === 'admin' && (<div className="notification notification-warning flex items-start gap-3"><Shield className="w-5 h-5 mt-0.5 shrink-0" /><p className="text-sm">Admin password recovery may require manual approval and take up to 24 hours.</p></div>)}
                    <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-2 gap-1"><button type="button" onClick={() => setActiveTab('user')} className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}><User className="w-4 h-4" /> User Recovery</button><button type="button" onClick={() => setActiveTab('admin')} className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}><Building className="w-4 h-4" /> Admin Recovery</button></div>
                    <div><h3 className="text-base font-semibold text-slate-700">Recovery Method</h3>
                        <div className="grid grid-cols-1 gap-3 mt-2">
                           <label className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${recoveryMethod === 'email' ? 'bg-blue-50 border-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}><input type="radio" name="recoveryMethod" value="email" checked={recoveryMethod === 'email'} onChange={(e) => setRecoveryMethod(e.target.value as 'email' | 'phone' | 'both')} className="text-blue-600 focus:ring-blue-500"/><Mail className="w-5 h-5 text-slate-400" /><span className="text-sm font-medium text-slate-700">Recover using Email</span></label>
                           <label className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${recoveryMethod === 'phone' ? 'bg-blue-50 border-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}><input type="radio" name="recoveryMethod" value="phone" checked={recoveryMethod === 'phone'} onChange={(e) => setRecoveryMethod(e.target.value as 'email' | 'phone' | 'both')} className="text-blue-600 focus:ring-blue-500"/><Phone className="w-5 h-5 text-slate-400" /><span className="text-sm font-medium text-slate-700">Recover using Phone</span></label>
                           <label className={`flex items-center space-x-3 border rounded-lg p-3 cursor-pointer transition-all ${recoveryMethod === 'both' ? 'bg-blue-50 border-blue-500' : 'border-slate-200 hover:bg-slate-50'}`}><input type="radio" name="recoveryMethod" value="both" checked={recoveryMethod === 'both'} onChange={(e) => setRecoveryMethod(e.target.value as 'email' | 'phone' | 'both')} className="text-blue-600 focus:ring-blue-500"/><Shield className="w-5 h-5 text-slate-400" /><span className="text-sm font-medium text-slate-700">Enhanced Security</span></label>
                        </div>
                    </div>
                    {(recoveryMethod === 'email' || recoveryMethod === 'both') && (<div><label className="form-label">Email Address</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input type="email" name="email" value={recoveryData.email} onChange={handleInputChange} className="form-input pl-10"/></div>{errors.email && <p className="form-error">{errors.email}</p>}</div>)}
                    {(recoveryMethod === 'phone' || recoveryMethod === 'both') && (<div><label className="form-label">Phone Number</label><div className="flex"><span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500">+91</span><input type="tel" name="phoneNumber" value={recoveryData.phoneNumber} onChange={handleInputChange} className="form-input rounded-l-none" maxLength={10}/></div>{errors.phoneNumber && <p className="form-error">{errors.phoneNumber}</p>}</div>)}
                    {captchaRequired && (<div><label className="form-label">Security Verification</label><div className="flex gap-4 items-center"><div className="flex-1 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-3 text-center"><span className="text-xl font-mono tracking-widest text-slate-700 select-none">{captchaText}</span></div><input type="text" name="captcha" value={recoveryData.captcha || ''} onChange={handleInputChange} className="form-input w-32" placeholder="Enter text" /><button type="button" onClick={() => setCaptchaText(generateCaptcha())} className="text-sm text-blue-600 hover:text-blue-800">Refresh</button></div>{errors.captcha && <p className="form-error">{errors.captcha}</p>}</div>)}
                    <button type="submit" disabled={isLoading} className="btn btn-primary w-full">{isLoading ? 'Processing...' : 'Send Verification Code'}</button>
                  </>
                )}

                {step === 'verify' && (
                  <div className="text-center space-y-4"><p className="text-slate-600">We've sent a code to your registered {recoveryMethod}.</p><div><label className="form-label text-left">Enter 6-digit OTP</label><input type="text" name="otp" value={recoveryData.otp} onChange={handleInputChange} className="form-input text-center tracking-[0.5em]" maxLength={6}/>{errors.otp && <p className="form-error">{errors.otp}</p>}</div><div className="mt-4"><button type="button" onClick={resendOTP} disabled={resendCooldown > 0} className={`text-sm ${resendCooldown > 0 ? 'text-slate-400' : 'text-blue-600 hover:underline'}`}>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}</button></div><button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-4">{isLoading ? 'Verifying...' : 'Verify Code'}</button></div>
                )}
                
                {step === 'security_questions' && selectedQuestion && (
                    <div><div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4"><p className="text-sm font-medium text-blue-800">{selectedQuestion.question}</p></div><label className="form-label">Your Answer</label><input type="text" name="securityAnswer" value={recoveryData.securityAnswer} onChange={handleInputChange} className="form-input"/>{errors.securityAnswer && <p className="form-error">{errors.securityAnswer}</p>}<button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-4">{isLoading ? 'Verifying...' : 'Submit Answer'}</button></div>
                )}

                {step === 'reset_password' && (
                    <div className="space-y-4">
                        <div><label className="form-label">New Password</label><div className="relative"><input type={showNewPassword ? 'text' : 'password'} name="newPassword" value={recoveryData.newPassword} onChange={handleInputChange} className="form-input pr-10"/><button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="form-input-icon">{showNewPassword ? <EyeOff/> : <Eye/>}</button></div>{recoveryData.newPassword && (<div className="flex items-center gap-2 mt-2"><div className="flex-1 bg-slate-200 h-2 rounded-full"><div className={`h-2 rounded-full ${getPasswordStrengthColor()}`} style={{width: `${(passwordStrength/5)*100}%`}}></div></div><span className="text-xs text-slate-500">{getPasswordStrengthText()}</span></div>)}{errors.newPassword && <p className="form-error">{errors.newPassword}</p>}</div>
                        <div><label className="form-label">Confirm New Password</label><div className="relative"><input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={recoveryData.confirmPassword} onChange={handleInputChange} className="form-input pr-10"/><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="form-input-icon">{showConfirmPassword ? <EyeOff/> : <Eye/>}</button></div>{errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}</div>
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-xs text-blue-800 space-y-1 mt-4"><h4 className="font-semibold">Password Requirements:</h4><ul className="list-disc list-inside"><li>At least 8 characters</li><li>Uppercase & lowercase letters</li><li>At least one number & one special character</li></ul></div>
                        <button type="submit" disabled={isLoading} className="btn btn-primary w-full mt-4">{isLoading ? 'Updating...' : 'Update Password'}</button>
                    </div>
                )}

                {step === 'success' && (
                  <div className="text-center space-y-6">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100"><CheckCircle2 className="h-8 w-8 text-green-600" /></div>
                    <div><h3 className="text-xl font-semibold text-slate-800">Password Reset Successful!</h3><p className="text-slate-600 mt-2">You can now sign in with your new password.</p></div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left text-xs text-green-800"><h4 className="font-semibold mb-2">Security Recommendations:</h4><ul className="list-disc list-inside space-y-1"><li>Sign out of all other devices.</li><li>Review your recent account activity.</li><li>Consider enabling two-factor authentication.</li></ul></div>
                    <Link to="/login" className="btn btn-primary w-full">Sign In Now</Link>
                  </div>
                )}
                 {step !== 'success' && (<div className="mt-6 text-center"><Link to="/login" className="inline-flex items-center text-sm text-slate-600 hover:text-blue-600"><ArrowLeft className="w-4 h-4 mr-1"/>Back to Sign In</Link></div>)}
              </form>
            </div>
            {attemptCount > 0 && step !== 'success' && (<div className="notification notification-warning mt-4"><p className="text-sm">Failed attempts: {attemptCount}/{maxAttempts}</p></div>)}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Still having trouble?</p>
              <div className="mt-2 space-x-4"><a href="tel:+918001234567" className="text-blue-600 hover:underline">📞 +91 800-123-4567</a><a href="mailto:support@fin-agentix.com" className="text-blue-600 hover:underline">✉️ support@fin-agentix.com</a></div>
            </div>
          </div>
        </div>
      </div>
       <style>{`.tab-button { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; border: 1px solid transparent } .tab-button.active { background-color: white; color: #2563eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border-color: #d1d5db } .tab-button:not(.active):hover { background-color: rgba(203, 213, 225, 0.5); }`}</style>
    </div>
  );
};

export default ForgotPassword;

