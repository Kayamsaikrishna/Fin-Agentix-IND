import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Building, Shield, Phone, Mail, Lock, AlertCircle, CheckCircle2, Fingerprint, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, verifyMFA } from '../../store/auth/thunks';
import { RootState } from '../../store';
import { clearError } from '../../store/auth/slice';
import { MAX_LOGIN_ATTEMPTS, ACCOUNT_LOCK_DURATION } from '../../config/constants';
import FinAgentixLogo from '../../assets/fin-agentix-logo.jpeg';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  phoneNumber?: string;
  otp?: string;
  captcha?: string;
}

interface LoginError {
  [key: string]: string;
}

interface SecurityChallenge {
  type: 'sms_otp' | 'email_otp' | 'biometric' | 'security_question' | 'captcha';
  message: string;
  attempts: number;
  maxAttempts: number;
}

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [loginStep, setLoginStep] = useState<'credentials' | 'mfa'>('credentials');
  const [securityChallenge, setSecurityChallenge] = useState<SecurityChallenge | null>(null);
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<LoginError>({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeLeft, setBlockTimeLeft] = useState(0);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  
  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: isLoading, error, requiresMFA, sessionToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkBiometricSupport = async () => {
      if ('credentials' in navigator && 'create' in navigator.credentials) {
        setBiometricSupported(true);
      }
    };
    checkBiometricSupport();
  }, []);
  
  // Clear error when changing tabs
  useEffect(() => {
    dispatch(clearError());
    setErrors({
      email: '',
      password: '',
      otp: '',
      general: ''
    });
  }, [activeTab, dispatch]);
  
  // Handle MFA requirement from Redux state
  useEffect(() => {
    if (requiresMFA && sessionToken) {
      setLoginStep('mfa');
    }
  }, [requiresMFA, sessionToken]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBlocked && blockTimeLeft > 0) {
      timer = setTimeout(() => {
        setBlockTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (blockTimeLeft === 0 && isBlocked) {
      setIsBlocked(false);
      setFailedAttempts(0);
      setCaptchaRequired(false);
    }
    return () => clearTimeout(timer);
  }, [isBlocked, blockTimeLeft]);

  const validateCredentials = (): boolean => {
    const newErrors: LoginError = {};
    if (!loginData.email) { newErrors.email = 'Email is required'; } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) { newErrors.email = 'Please enter a valid email address';}
    if (!loginData.password) { newErrors.password = 'Password is required';} 
    else if (loginData.password.length < 8) { newErrors.password = 'Password must be at least 8 characters';}
    if (captchaRequired && !loginData.captcha) { newErrors.captcha = 'Please complete the captcha verification';}
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = (): boolean => {
    if (!loginData.otp) { setErrors({ otp: 'Please enter the OTP' }); return false; }
    if (loginData.otp.length !== 6) { setErrors({ otp: 'OTP must be 6 digits' }); return false; }
    setErrors({});
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) { setErrors(prev => ({ ...prev, [name]: '' })); }
  };

  const generateCaptcha = (): string => {
    const chars = 'ABCDEHKMNP23456789';
    let result = '';
    for (let i = 0; i < 6; i++) { result += chars.charAt(Math.floor(Math.random() * chars.length)); }
    return result;
  };

  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  const handleCredentialsSubmit = async () => {
    if (!validateCredentials()) return;
    
    try {
      // Dispatch login action
      const result = await dispatch(login({
        email: loginData.email,
        password: loginData.password,
        rememberMe: loginData.rememberMe
      })) as any;
      
      if (!result.payload || result.error) {
        // Handle failed login
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 3) { setCaptchaRequired(true); }
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          setIsBlocked(true);
          setBlockTimeLeft(ACCOUNT_LOCK_DURATION);
          setErrors({ general: 'Account locked. Try again in 5 minutes.' });
        } else {
          setErrors({ general: `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.` });
        }
      } else if (!requiresMFA) {
        // If login successful and no MFA required, redirect to dashboard
        navigate(activeTab === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }
      // If MFA is required, the useEffect will handle setting the login step
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const handleOTPSubmit = async () => {
    if (!validateOTP()) return;
    
    try {
      // Dispatch verifyMFA action
      const result = await dispatch(verifyMFA({
        email: loginData.email,
        otp: loginData.otp,
        sessionToken: sessionToken || ''
      })) as any;
      
      if (!result.payload || result.error) {
        // Handle failed verification
        if (securityChallenge) {
          const newAttempts = securityChallenge.attempts + 1;
          if (newAttempts >= securityChallenge.maxAttempts) {
            setErrors({ general: 'Too many failed OTP attempts. Please try logging in again.' });
            setLoginStep('credentials');
            setSecurityChallenge(null);
            setFailedAttempts(prev => prev + 1);
          } else {
            setSecurityChallenge(prev => prev ? { ...prev, attempts: newAttempts } : null);
            setErrors({ otp: `Invalid OTP. ${securityChallenge.maxAttempts - newAttempts} attempts remaining.` });
          }
        }
      } else {
        // If verification successful, redirect to dashboard
        navigate(activeTab === 'admin' ? '/admin/dashboard' : '/user/dashboard');
      }
    } catch (error) {
      setErrors({ otp: 'OTP verification failed. Please try again.' });
    }
  };

  const handleBiometricLogin = async () => {
    if (!biometricSupported) { setErrors({ general: 'Biometric authentication is not supported on this device.' }); return; }
    dispatch({ type: 'auth/setLoading', payload: true });
    try {
      // In a real app, this would trigger biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dispatch login success action
      dispatch({
        type: 'auth/loginSuccess',
        payload: {
          token: activeTab === 'admin' ? 'admin-jwt-token-123' : 'user-jwt-token-456',
          user: {
            email: loginData.email,
            role: activeTab
          }
        }
      });
      
      // Redirect to dashboard
      navigate(activeTab === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (error) {
      setErrors({ general: 'Biometric authentication failed.' });
      dispatch({ type: 'auth/setError', payload: 'Biometric authentication failed.' });
    } finally {
      dispatch({ type: 'auth/setLoading', payload: false });
    }
  };

  const resendOTP = async () => {
    dispatch({ type: 'auth/setLoading', payload: true });
    try {
      // In a real app, this would call the API to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('OTP resent successfully!');
      if (securityChallenge) {
        setSecurityChallenge(prev => prev ? { ...prev, attempts: 0 } : null);
      }
      setLoginData(prev => ({ ...prev, otp: '' }));
      setErrors(prev => ({ ...prev, otp: '' }));
    } catch (error) {
      setErrors({ otp: 'Failed to resend OTP.' });
      dispatch({ type: 'auth/setError', payload: 'Failed to resend OTP.' });
    } finally {
      dispatch({ type: 'auth/setLoading', payload: false });
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] opacity-20"></div>
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-start justify-center p-12 bg-slate-100 border-r border-slate-200">
          <div className="space-y-4 animate-slideUp">
            <img src={FinAgentixLogo} alt="Fin-Agentix Logo" className="w-16 h-16 rounded-lg shadow-md"/>
            <h1 className="text-5xl font-bold tracking-tighter text-slate-900">Secure, Swift,<br/><span className="text-blue-600">Seamless Lending.</span></h1>
            <p className="text-lg text-slate-600 max-w-lg">Welcome back to Fin-Agentix India, the nexus of financial innovation and institutional power.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md animate-fadeIn">
             <div className="card">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                  <p className="text-slate-600 mt-2">Sign in to your account</p>
                </div>
                <div className="bg-slate-100 p-1 rounded-lg grid grid-cols-2 gap-1 mb-6">
                  <button onClick={() => setActiveTab('user')} className={`tab-button ${activeTab === 'user' ? 'active' : ''}`}><User className="w-4 h-4" /> User Login</button>
                  <button onClick={() => setActiveTab('admin')} className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}><Building className="w-4 h-4" /> Admin Login</button>
                </div>

                {isBlocked && (<div className="notification notification-error mb-4"><h4 className="font-semibold">Account Locked</h4><p>Please wait {formatTime(blockTimeLeft)} before trying again.</p></div>)}
                {activeTab === 'admin' && loginStep === 'credentials' && (<div className="notification notification-warning flex items-start gap-3 mb-4"><Shield className="w-5 h-5 mt-0.5 shrink-0" /><p className="text-sm">Admin accounts require multi-factor authentication and are monitored for suspicious activity.</p></div>)}
                {(errors.general || error) && <div className="notification notification-error mb-4"><p>{errors.general || error}</p></div>}
                
                {loginStep === 'credentials' ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleCredentialsSubmit(); }} className="space-y-6">
                      <div><label className="form-label">Email Address</label><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input type="email" name="email" value={loginData.email} onChange={handleInputChange} className="form-input pl-10" placeholder="you@example.com" disabled={isBlocked} /></div>{errors.email && <p className="form-error">{errors.email}</p>}</div>
                      <div><label className="form-label">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" /><input type={showPassword ? 'text' : 'password'} name="password" value={loginData.password} onChange={handleInputChange} className="form-input pl-10 pr-10" placeholder="••••••••" disabled={isBlocked} /><button type="button" onClick={() => setShowPassword(!showPassword)} className="form-input-icon" disabled={isBlocked}>{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button></div>{errors.password && <p className="form-error">{errors.password}</p>}</div>
                      {captchaRequired && (<div><label className="form-label">Security Verification</label><div className="flex gap-4 items-center"><div className="flex-1 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-3 text-center"><span className="text-xl font-mono tracking-widest text-slate-700 select-none">{captchaText}</span></div><input type="text" name="captcha" value={loginData.captcha || ''} onChange={handleInputChange} className="form-input w-32" placeholder="Enter text" disabled={isBlocked} /><button type="button" onClick={() => setCaptchaText(generateCaptcha())} className="text-sm text-blue-600 hover:text-blue-800">Refresh</button></div>{errors.captcha && <p className="form-error">{errors.captcha}</p>}</div>)}
                      <div className="flex items-center justify-between text-sm"><div className="flex items-center gap-2"><input id="rememberMe" name="rememberMe" type="checkbox" checked={loginData.rememberMe} onChange={handleInputChange} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" disabled={isBlocked} /><label htmlFor="rememberMe" className="text-slate-600">Remember me</label></div><Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">Forgot password?</Link></div>
                      <div className="space-y-4 pt-2"><button type="submit" disabled={isLoading || isBlocked} className="btn btn-primary w-full">{isLoading ? 'Signing In...' : 'Sign In'}</button>{biometricSupported && !isBlocked && (<button type="button" onClick={handleBiometricLogin} disabled={isLoading} className="btn btn-ghost w-full"><Fingerprint className="w-5 h-5" /> Sign In with Biometric</button>)}</div>
                  </form>
                ) : (
                  <div className="space-y-6 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">{securityChallenge?.type === 'sms_otp' ? <Smartphone className="h-6 w-6 text-blue-600" /> : <Mail className="h-6 w-6 text-blue-600" />}</div>
                    <h3 className="text-lg font-semibold text-gray-900">Security Verification</h3>
                    <p className="text-sm text-gray-600 mb-4">{securityChallenge?.message}</p>
                    <form onSubmit={(e) => { e.preventDefault(); handleOTPSubmit(); }}>
                      <div><label className="form-label text-left">Enter 6-digit OTP</label><input type="text" name="otp" value={loginData.otp || ''} onChange={handleInputChange} className="form-input text-center text-lg tracking-[0.5em]" placeholder="••••••" maxLength={6} />{errors.otp && <p className="form-error">{errors.otp}</p>}</div>
                      <div className="mt-6 space-y-4">
                        <button type="submit" disabled={isLoading} className="btn btn-primary w-full">{isLoading ? 'Verifying...' : 'Verify & Sign In'}</button>
                        <div className="text-center"><button type="button" onClick={resendOTP} disabled={isLoading} className="text-sm text-blue-600 hover:underline">Didn't receive OTP? Resend</button></div>
                        <div className="text-center"><button type="button" onClick={() => { setLoginStep('credentials'); setSecurityChallenge(null); setLoginData(prev => ({ ...prev, otp: '' })); }} className="text-sm text-gray-600 hover:underline">Back to login</button></div>
                      </div>
                    </form>
                    {securityChallenge && securityChallenge.attempts > 0 && (<div className="notification notification-warning mt-4"><p className="text-sm">Failed attempts: {securityChallenge.attempts}/{securityChallenge.maxAttempts}</p></div>)}
                  </div>
                )}
            </div>
            <p className="text-center text-sm text-slate-600 mt-6">Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Create one here</Link></p>
            <div className="mt-6 border-t pt-6">
              <h4 className="text-sm text-center font-medium text-slate-700 mb-3">Security Features</h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> 256-bit SSL Encryption</div>
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> RBI Compliant Security</div>
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Multi-Factor Authentication</div>
                <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2" /> Fraud Detection System</div>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Need help? Contact our support team</p>
              <div className="mt-2 space-x-4"><a href="tel:+918001234567" className="text-blue-600 hover:underline">📞 +91 800-123-4567</a><a href="mailto:support@fin-agentix.com" className="text-blue-600 hover:underline">✉️ support@fin-agentix.com</a></div>
              <p className="mt-2 text-xs">Available 24/7 | Response within 2 hours</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`.tab-button { display: flex; align-items: center; justify-content: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; } .tab-button.active { background-color: white; color: #2563eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1); } .tab-button:not(.active):hover { background-color: rgba(203, 213, 225, 0.5); }`}</style>
    </div>
  );
};

export default Login;

