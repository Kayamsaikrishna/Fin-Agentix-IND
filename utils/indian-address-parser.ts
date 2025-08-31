// Indian address parsing and validation

interface IndianAddress {
  houseNumber?: string;
  street?: string;
  area?: string;
  city: string;
  district?: string;
  state: string;
  pincode: string;
  country: 'India';
}

export class IndianAddressParser {
  private stateMapping = {
    'AN': 'Andaman and Nicobar Islands',
    'AP': 'Andhra Pradesh',
    'AR': 'Arunachal Pradesh',
    'AS': 'Assam',
    'BR': 'Bihar',
    'CH': 'Chandigarh',
    'CG': 'Chhattisgarh',
    'DN': 'Dadra and Nagar Haveli',
    'DD': 'Daman and Diu',
    'DL': 'Delhi',
    'GA': 'Goa',
    'GJ': 'Gujarat',
    'HR': 'Haryana',
    'HP': 'Himachal Pradesh',
    'JK': 'Jammu and Kashmir',
    'JH': 'Jharkhand',
    'KA': 'Karnataka',
    'KL': 'Kerala',
    'LD': 'Lakshadweep',
    'MP': 'Madhya Pradesh',
    'MH': 'Maharashtra',
    'MN': 'Manipur',
    'ML': 'Meghalaya',
    'MZ': 'Mizoram',
    'NL': 'Nagaland',
    'OR': 'Odisha',
    'PY': 'Puducherry',
    'PB': 'Punjab',
    'RJ': 'Rajasthan',
    'SK': 'Sikkim',
    'TN': 'Tamil Nadu',
    'TG': 'Telangana',
    'TR': 'Tripura',
    'UP': 'Uttar Pradesh',
    'UT': 'Uttarakhand',
    'WB': 'West Bengal'
  };
  
  parseAddress(addressString: string): IndianAddress | null {
    // Implementation for parsing Indian addresses
    // Extract pincode, state, city from address string
    
    const pincodeMatch = addressString.match(/\d{6}/);
    if (!pincodeMatch) {
      return null;
    }
    
    const pincode = pincodeMatch[0];
    const stateCode = this.getStateFromPincode(pincode);
    
    return {
      pincode,
      state: this.stateMapping[stateCode] || '',
      city: '',
      country: 'India'
    };
  }
  
  private getStateFromPincode(pincode: string): string {
    // Map pincode to state code based on first digit
    const firstDigit = pincode[0];
    const stateMapping: Record<string, string> = {
      '1': 'DL', // Delhi, Punjab, Haryana
      '2': 'HR', // Haryana, Punjab
      '3': 'RJ', // Rajasthan
      '4': 'GJ', // Gujarat
      '5': 'MH', // Maharashtra
      '6': 'KA', // Karnataka, Goa
      '7': 'AP', // Andhra Pradesh, Telangana
      '8': 'TN', // Tamil Nadu
      '9': 'KL'  // Kerala
    };
    
    return stateMapping[firstDigit] || '';
  }
}
