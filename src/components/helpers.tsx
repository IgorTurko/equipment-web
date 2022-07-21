import { createStandaloneToast } from '@chakra-ui/react';

export function showErrorToast(title: string, description: string | null): void {
  const { toast } = createStandaloneToast();
  toast({
    title,
    description,
    status: 'error',
    duration: null,
    isClosable: true,
  });
}

export function showSuccessToast(title: string, description: string | null): void {
  const { toast } = createStandaloneToast();
  toast({
    title,
    description,
    status: 'success',
    duration: 5000,
    isClosable: true,
  });
}
