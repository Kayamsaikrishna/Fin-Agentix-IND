import React from 'react';
import { Grid, Typography, Avatar } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../common/Card';
import Input from '../common/Input';
import PhoneInput from '../common/PhoneInput';
import Button from '../common/Button';
import AadhaarInput from '../common/AadhaarInput';
import PanInput from '../common/PanInput';

interface UserProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  panNumber: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  aadhaarNumber: yup.string().required('Aadhaar number is required'),
  panNumber: yup.string().required('PAN number is required'),
  dob: yup.string().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required'),
});

const UserProfile: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      // TODO: Implement API call to update user profile
      console.log('Form data:', data);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-6">
            <Avatar
              sx={{ width: 100, height: 100 }}
              alt="User Profile"
              src="/path-to-profile-image.jpg"
            />
            <div>
              <Typography variant="h6">Profile Picture</Typography>
              <Typography variant="body2" color="textSecondary">
                Upload a high-resolution profile picture
              </Typography>
              <Button
                variant="outlined"
                size="small"
                className="mt-2"
                onClick={() => {
                  // TODO: Implement profile picture upload
                }}
              >
                Change Picture
              </Button>
            </div>
          </div>
        </Card>

        <Card title="Personal Information">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="First Name"
                    error={errors.firstName?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Last Name"
                    error={errors.lastName?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    error={errors.phone?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        </Card>

        <Card title="KYC Information">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="aadhaarNumber"
                control={control}
                render={({ field }) => (
                  <AadhaarInput
                    {...field}
                    error={errors.aadhaarNumber?.message}
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
                name="dob"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Date of Birth"
                    type="date"
                    error={errors.dob?.message}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Gender"
                    select
                    error={errors.gender?.message}
                    required
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Input>
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

export default UserProfile;
