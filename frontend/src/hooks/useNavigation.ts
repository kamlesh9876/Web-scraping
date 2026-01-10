import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { navigationApi } from '@/lib/api';
import { Navigation } from '@/types';

export const useNavigation = () => {
  return useQuery({
    queryKey: ['navigation'],
    queryFn: navigationApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useNavigationBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['navigation', slug],
    queryFn: () => navigationApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useRefreshNavigation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: navigationApi.refresh,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navigation'] });
    },
    onError: (error) => {
      console.error('Failed to refresh navigation:', error);
    },
  });
};
