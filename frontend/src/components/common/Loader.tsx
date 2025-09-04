import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

interface LoaderProps {
  text?: string;
  size?: number;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  text = 'Loading...',
  size = 40,
  fullScreen = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <CircularProgress size={size} />
      {text && (
        <Typography variant="body2" color="textSecondary">
          {text}
        </Typography>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
