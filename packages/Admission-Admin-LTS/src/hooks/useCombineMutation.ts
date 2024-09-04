import { UseMutateAsyncFunction } from '@tanstack/react-query';

export const useCombineMutation = () => {
  const combinedMutations = async (mutations: UseMutateAsyncFunction[], success?: () => void, error?: () => void) => {
    try {
      for (const mutation of mutations) {
        await mutation();
      }
      if (success) success();
    } catch {
      if (error) error();
    }
  };
  return { combinedMutations };
};
