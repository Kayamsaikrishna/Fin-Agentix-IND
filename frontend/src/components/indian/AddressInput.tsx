import React from 'react';
import { Grid } from '@mui/material';
import Input from '../common/Input';
import IndianStateSelect from '../common/IndianStateSelect';
import PincodeInput from '../common/PincodeInput';

interface AddressInputProps {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  onAddressLine1Change: (value: string) => void;
  onAddressLine2Change: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onPincodeChange: (value: string) => void;
  errors?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  disabled?: boolean;
}

const AddressInput: React.FC<AddressInputProps> = ({
  addressLine1,
  addressLine2,
  city,
  state,
  pincode,
  onAddressLine1Change,
  onAddressLine2Change,
  onCityChange,
  onStateChange,
  onPincodeChange,
  errors = {},
  disabled = false,
}) => {
  const handlePincodeBlur = async () => {
    if (pincode.length === 6) {
      try {
        // TODO: Implement pincode lookup service
        // const response = await fetch(`/api/pincode/${pincode}`);
        // const data = await response.json();
        // onCityChange(data.city);
        // onStateChange(data.state);
      } catch (error) {
        console.error('Error fetching pincode details:', error);
      }
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Input
          label="Address Line 1"
          value={addressLine1}
          onChange={(e) => onAddressLine1Change(e.target.value)}
          error={errors.addressLine1}
          required
          disabled={disabled}
          placeholder="Flat/House No., Building Name, Street"
        />
      </Grid>
      <Grid item xs={12}>
        <Input
          label="Address Line 2"
          value={addressLine2}
          onChange={(e) => onAddressLine2Change(e.target.value)}
          error={errors.addressLine2}
          disabled={disabled}
          placeholder="Area, Landmark"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <PincodeInput
          value={pincode}
          onChange={onPincodeChange}
          error={errors.pincode}
          required
          disabled={disabled}
          onBlur={handlePincodeBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Input
          label="City"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          error={errors.city}
          required
          disabled={disabled}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <IndianStateSelect
          value={state}
          onChange={onStateChange}
          error={errors.state}
          required
          disabled={disabled}
        />
      </Grid>
    </Grid>
  );
};

export default AddressInput;
}
