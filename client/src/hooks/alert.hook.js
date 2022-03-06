import { useCallback } from 'react';
import { useSnackbar, closeSnackbar } from 'notistack';

const useAlert = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useCallback((message, type) => {
    enqueueSnackbar(message, { variant: type });
  }, []);
};
export default useAlert;
