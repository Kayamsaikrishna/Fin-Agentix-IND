import React, { useRef, useState, useCallback } from 'react';
import { Typography, Button as MuiButton } from '@mui/material';
import Webcam from 'react-webcam';
import { Camera, Video, CheckCircle, XCircle } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface VideoKYCProps {
  onComplete?: (videoBlob: Blob) => void;
  onError?: (error: string) => void;
}

const VideoKYC: React.FC<VideoKYCProps> = ({ onComplete, onError }) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStartRecording = useCallback(() => {
    setError(null);
    let count = 3;
    setCountdown(count);

    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);
        setCountdown(null);
        startRecording();
      }
    }, 1000);
  }, []);

  const startRecording = useCallback(() => {
    chunksRef.current = [];
    setIsRecording(true);

    const stream = webcamRef.current?.stream;
    if (!stream) {
      setError('Cannot access webcam stream');
      return;
    }

    try {
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.addEventListener('stop', handleStop);
      mediaRecorderRef.current.start();

      // Stop recording after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current?.state === 'recording') {
          stopRecording();
        }
      }, 30000);
    } catch (err) {
      setError('Failed to start recording');
      onError?.('Failed to start recording');
    }
  }, [onError]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  }, []);

  const handleDataAvailable = useCallback(({ data }: BlobEvent) => {
    if (data.size > 0) {
      chunksRef.current.push(data);
    }
  }, []);

  const handleStop = useCallback(() => {
    const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
    setRecordingComplete(true);
    onComplete?.(videoBlob);
  }, [onComplete]);

  const retryRecording = useCallback(() => {
    setRecordingComplete(false);
    setError(null);
    chunksRef.current = [];
  }, []);

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <Typography variant="h6">Video KYC Verification</Typography>
          <Typography variant="body2" color="textSecondary">
            Please record a short video for identity verification. Make sure you're in
            a well-lit area and your face is clearly visible.
          </Typography>
        </div>

        <div className="relative">
          <Webcam
            ref={webcamRef}
            audio={false}
            className="w-full rounded-lg"
            videoConstraints={{
              width: 720,
              height: 480,
              facingMode: 'user',
            }}
          />

          {countdown !== null && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Typography variant="h2" className="text-white">
                {countdown}
              </Typography>
            </div>
          )}

          {isRecording && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <Typography variant="caption">Recording...</Typography>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <XCircle size={20} />
            <Typography color="error">{error}</Typography>
          </div>
        )}

        {recordingComplete ? (
          <div className="flex items-center gap-2 text-green-500">
            <CheckCircle size={20} />
            <Typography color="success">Recording completed successfully</Typography>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            {!isRecording ? (
              <Button
                variant="contained"
                onClick={handleStartRecording}
                icon={<Camera />}
                disabled={!!countdown}
              >
                Start Recording
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={stopRecording}
                icon={<Video />}
              >
                Stop Recording
              </Button>
            )}
          </div>
        )}

        {recordingComplete && (
          <div className="flex justify-center">
            <Button variant="outlined" onClick={retryRecording}>
              Record Again
            </Button>
          </div>
        )}

        <Typography variant="caption" color="textSecondary" className="block text-center">
          The recording will automatically stop after 30 seconds
        </Typography>
      </div>
    </Card>
  );
};

export default VideoKYC;
