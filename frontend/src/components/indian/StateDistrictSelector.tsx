import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Select from '../common/Select';

interface District {
  code: string;
  name: string;
}

interface State {
  code: string;
  name: string;
  districts: District[];
}

interface StateDistrictSelectorProps {
  state: string;
  district: string;
  onStateChange: (state: string) => void;
  onDistrictChange: (district: string) => void;
  errors?: {
    state?: string;
    district?: string;
  };
  required?: boolean;
  disabled?: boolean;
}

// This would typically come from an API or JSON file
const INDIAN_STATES: State[] = [
  {
    code: 'AP',
    name: 'Andhra Pradesh',
    districts: [
      { code: 'ANT', name: 'Anantapur' },
      { code: 'CHT', name: 'Chittoor' },
      // Add more districts...
    ],
  },
  {
    code: 'TG',
    name: 'Telangana',
    districts: [
      { code: 'HYD', name: 'Hyderabad' },
      { code: 'RR', name: 'Ranga Reddy' },
      // Add more districts...
    ],
  },
  // Add more states...
];

const StateDistrictSelector: React.FC<StateDistrictSelectorProps> = ({
  state,
  district,
  onStateChange,
  onDistrictChange,
  errors = {},
  required = false,
  disabled = false,
}) => {
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    const selectedState = INDIAN_STATES.find((s) => s.code === state);
    if (selectedState) {
      setDistricts(selectedState.districts);
      // Reset district if current district is not in the new state's districts
      if (!selectedState.districts.find((d) => d.code === district)) {
        onDistrictChange('');
      }
    } else {
      setDistricts([]);
      onDistrictChange('');
    }
  }, [state]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Select
          label="State"
          value={state}
          onChange={onStateChange}
          options={INDIAN_STATES.map((state) => ({
            value: state.code,
            label: state.name,
          }))}
          error={errors.state}
          required={required}
          disabled={disabled}
          placeholder="Select state"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          label="District"
          value={district}
          onChange={onDistrictChange}
          options={districts.map((district) => ({
            value: district.code,
            label: district.name,
          }))}
          error={errors.district}
          required={required}
          disabled={disabled || !state}
          placeholder={state ? 'Select district' : 'Select state first'}
        />
      </Grid>
    </Grid>
  );
};

export default StateDistrictSelector;
