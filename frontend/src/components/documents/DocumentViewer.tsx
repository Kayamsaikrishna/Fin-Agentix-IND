import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';

interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface DocumentViewerProps {
  document: Document;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ document }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError('Failed to load document');
  };

  const renderContent = () => {
    const fileType = document.type.toLowerCase();

    if (fileType.includes('pdf')) {
      return (
        <iframe
          src={`${document.url}#toolbar=0`}
          className="w-full h-[80vh]"
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    if (fileType.includes('image')) {
      return (
        <img
          src={document.url}
          alt={document.name}
          className="max-w-full h-auto"
          onLoad={handleLoad}
          onError={handleError}
        />
      );
    }

    return (
      <div className="p-8 text-center">
        <Typography color="textSecondary">
          Preview not available for this file type
        </Typography>
      </div>
    );
  };

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
          <CircularProgress />
        </div>
      )}
      {error ? (
        <div className="p-8 text-center">
          <Typography color="error">{error}</Typography>
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default DocumentViewer;
