import React, { useCallback, useState } from 'react';
import { Typography, IconButton, CircularProgress } from '@mui/material';
import { Upload, X, FileText, Check } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import Card from '../common/Card';

interface DocumentUploadProps {
  title: string;
  description: string;
  acceptedFileTypes: string[];
  maxFileSize: number; // in bytes
  onUpload: (file: File) => Promise<void>;
  error?: string;
  value?: string;
  required?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  title,
  description,
  acceptedFileTypes,
  maxFileSize,
  onUpload,
  error,
  value,
  required = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setUploadError(null);

    try {
      await onUpload(file);
    } catch (err) {
      setUploadError((err as Error).message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: 1,
    disabled: loading,
  });

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center gap-2">
          <CircularProgress size={40} />
          <Typography>Uploading document...</Typography>
        </div>
      );
    }

    if (value) {
      return (
        <div className="flex items-center justify-between p-4 border rounded">
          <div className="flex items-center gap-3">
            <FileText className="text-green-600" size={24} />
            <div>
              <Typography variant="subtitle2">Document uploaded</Typography>
              <Typography variant="caption" color="textSecondary">
                File successfully uploaded
              </Typography>
            </div>
          </div>
          <IconButton
            size="small"
            onClick={() => onUpload(null as any)}
            color="error"
          >
            <X size={20} />
          </IconButton>
        </div>
      );
    }

    return (
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
          ${error || uploadError ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <Upload
          size={40}
          className={
            error || uploadError ? 'text-red-500' : 'text-primary-500'
          }
        />
        <Typography variant="subtitle1" className="mt-2">
          {isDragActive
            ? 'Drop the file here'
            : 'Drag and drop your document here'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          or click to browse
        </Typography>
        <Typography variant="caption" color="textSecondary" className="mt-2 block">
          Supported formats: {acceptedFileTypes.join(', ')} (Max size:{' '}
          {Math.round(maxFileSize / (1024 * 1024))}MB)
        </Typography>
      </div>
    );
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <Typography variant="h6">
            {title} {required && <span className="text-red-500">*</span>}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </div>

        {renderContent()}

        {(error || uploadError) && (
          <Typography color="error" variant="caption">
            {error || uploadError}
          </Typography>
        )}
      </div>
    </Card>
  );
};

export default DocumentUpload;
