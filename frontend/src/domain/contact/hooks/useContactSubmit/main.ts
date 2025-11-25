import { useMutation } from '@tanstack/react-query';
import { contactService } from '../../services';
import type { ContactFormOutput } from '../../types';

export const useContactSubmit = () => {
  const mutation = useMutation({
    mutationFn: (data: ContactFormOutput) => contactService.submit(data),
    retry: 1,
    retryDelay: 2000,
  });

  return {
    submit: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
