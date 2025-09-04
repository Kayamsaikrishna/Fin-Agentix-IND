import React, { useState } from 'react';
import { Grid, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../common/Card';
import Button from '../common/Button';
import AadhaarInput from '../common/AadhaarInput';
import PanInput from '../common/PanInput';
import DocumentUpload from './DocumentUpload';
import VideoKYC from './VideoKYC';
import AddressInput from '../indian/AddressInput';

interface KYCFormData {
  aadhaarNumber: string;
  panNumber: string;
  addressProof: File | null;
  photoProof: File | null;
  signatureProof: File | null;
  videoKYC: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const schema = yup.object().shape({
  aadhaarNumber: yup.string().required('Aadhaar number is required'),
  panNumber: yup.string().required('PAN number is required'),
  addressLine1: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required'),
});

const steps = [
  'Basic Details',
  'Document Upload',
  'Video KYC',
  'Address Verification',
];

const KYCForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<KYCFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: KYCFormData) => {
    setLoading(true);
    try {
      // TODO: Implement KYC submission logic
      console.log('Form data:', data);
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
      }
    } catch (error) {
      console.error('Error submitting KYC:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
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
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="addressProof"
                control={control}
                render={({ field }) => (
                  <DocumentUpload
                    title="Address Proof"
                    description="Upload any government-issued address proof (Aadhaar, Passport, Driving License)"
                    acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png']}
                    maxFileSize={5 * 1024 * 1024} // 5MB
                    onUpload={async (file) => field.onChange(file)}
                    error={errors.addressProof?.message}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="photoProof"
                control={control}
                render={({ field }) => (
                  <DocumentUpload
                    title="Photo ID Proof"
                    description="Upload a recent passport-sized photograph"
                    acceptedFileTypes={['.jpg', '.jpeg', '.png']}
                    maxFileSize={2 * 1024 * 1024} // 2MB
                    onUpload={async (file) => field.onChange(file)}
                    error={errors.photoProof?.message}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return <VideoKYC />;

      case 3:
        return (
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <AddressInput
                addressLine1={field.value?.addressLine1 || ''}
                addressLine2={field.value?.addressLine2 || ''}
                city={field.value?.city || ''}
                state={field.value?.state || ''}
                pincode={field.value?.pincode || ''}
                onAddressLine1Change={(value) =>
                  field.onChange({ ...field.value, addressLine1: value })
                }
                onAddressLine2Change={(value) =>
                  field.onChange({ ...field.value, addressLine2: value })
                }
                onCityChange={(value) =>
                  field.onChange({ ...field.value, city: value })
                }
                onStateChange={(value) =>
                  field.onChange({ ...field.value, state: value })
                }
                onPincodeChange={(value) =>
                  field.onChange({ ...field.value, pincode: value })
                }
                errors={errors.address as any}
                required
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <Card>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Card>

        <Card title={steps[activeStep]}>{renderStepContent()}</Card>

        <div className="flex justify-between">
          <Button
            variant="outlined"
            onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
            disabled={activeStep === 0 || loading}
          >
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={loading}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default KYCForm;
