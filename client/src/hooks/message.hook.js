import { useCallback } from 'react';
import { Alert } from '@mui/material';

export const useMessage = () => {
  return useCallback(text => {
    <Alert severity="success">{text}</Alert>;
  }, []);
};
