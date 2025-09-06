
import React, { useState } from 'react';
import { initiateAadhaar, verifyAadhaar } from '../utils/api';

const Kyc = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const onInitiate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await initiateAadhaar(aadhaarNumber);
      setReferenceId(res.reference_id);
    } catch (err) {
      console.error(err);
    }
  };

  const onVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await verifyAadhaar(otp, referenceId);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={onInitiate}>
        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadhaarNumber}
          onChange={(e) => setAadhaarNumber(e.target.value)}
          required
        />
        <button type="submit">Initiate KYC</button>
      </form>

      {referenceId && (
        <form onSubmit={onVerify}>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify KYC</button>
        </form>
      )}
    </div>
  );
};

export default Kyc;
