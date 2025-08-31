// Indian-specific validation utilities

export function validateAadhaarNumber(aadhaar: string): boolean {
  // Remove spaces and hyphens
  const cleaned = aadhaar.replace(/[\s-]/g, '');
  
  // Check if it's 12 digits
  if (!/^\d{12}$/.test(cleaned)) {
    return false;
  }
  
  // Verhoeff algorithm validation
  return verhoeffValidation(cleaned);
}

export function validatePANNumber(pan: string): boolean {
  // PAN format: AAAAA9999A
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.toUpperCase());
}

export function validateGSTIN(gstin: string): boolean {
  // GSTIN format: 15 characters
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin.toUpperCase());
}

export function validateIFSCCode(ifsc: string): boolean {
  // IFSC format: ABCD0123456
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc.toUpperCase());
}

export function validateIndianMobile(mobile: string): boolean {
  // Indian mobile format: 10 digits starting with 6-9
  const mobileRegex = /^[6-9]\d{9}$/;
  return mobileRegex.test(mobile);
}

function verhoeffValidation(aadhaar: string): boolean {
  // Verhoeff algorithm implementation for Aadhaar validation
  // This is a simplified version
  return true; // TODO: Implement full Verhoeff algorithm
}
