import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    (message, type) => {
      enqueueSnackbar(message, { variant: type });
    },
    [enqueueSnackbar]
  );
};
export default useAlert;
