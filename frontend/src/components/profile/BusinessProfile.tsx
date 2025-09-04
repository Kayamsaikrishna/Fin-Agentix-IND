import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../common/Card';
import Input from '../common/Input';
import Select from '../common/Select';
import PanInput from '../common/PanInput';
import GstInput from '../common/GstInput';
import IndianStateSelect from '../common/IndianStateSelect';
import Button from '../common/Button';

interface BusinessProfileFormData {
  businessName: string;
  businessType: string;
  panNumber: string;
  gstNumber: string;
  udyamNumber: string;
  incorporationDate: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  annualTurnover: string;
  industryType: string;
}

const schema = yup.object().shape({
  businessName: yup.string().required('Business name is required'),
  businessType: yup.string().required('Business type is required'),
  panNumber: yup.string().required('PAN number is required'),
  gstNumber: yup.string().required('GST number is required'),
  udyamNumber: yup.string(),
  incorporationDate: yup.string().required('Incorporation date is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required'),
  contactName: yup.string().required('Contact name is required'),
  contactEmail: yup.string().email('Invalid email').required('Email is required'),
  contactPhone: yup.string().required('Contact phone is required'),
  annualTurnover: yup.string().required('Annual turnover is required'),
  industryType: yup.string().required('Industry type is required'),
});

const businessTypes = [
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'pvt_ltd', label: 'Private Limited' },
  { value: 'ltd', label: 'Limited Company' },
  { value: 'llp', label: 'Limited Liability Partnership' },
];

const industryTypes = [
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'services', label: 'Services' },
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'construction', label: 'Construction' },
];

const BusinessProfile: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessProfileFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: BusinessProfileFormData) => {
    try {
      // TODO: Implement API call to update business profile
      console.log('Form data:', data);
    } catch (error) {
      console.error('Error updating business profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card title="Business Information">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="businessName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Business Name"
                    error={errors.businessName?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="businessType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Business Type"
                    options={businessTypes}
                    error={errors.businessType?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="panNumber"
                control={control}
                render={({ field }) => (
                  <PanInput
                    {...field}
                    error={errors.panNumber?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="gstNumber"
                control={control}
                render={({ field }) => (
                  <GstInput
                    {...field}
                    error={errors.gstNumber?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        <Card title="Business Address">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Address"
                    multiline
                    rows={3}
                    error={errors.address?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="City"
                    error={errors.city?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <IndianStateSelect
                    {...field}
                    error={errors.state?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        <Card title="Contact Details">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="contactName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Contact Person Name"
                    error={errors.contactName?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="contactEmail"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    type="email"
                    error={errors.contactEmail?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BusinessProfile;
