import { useQuery, useQueryClient } from '@tanstack/react-query';
import { productsApi, productDetailsApi } from '@/lib/api';
import { Product, ProductDetail, PaginatedResponse } from '@/types';

export const useProducts = (params?: {
  categorySlug?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

export const useProductBySourceId = (sourceId: string) => {
  return useQuery({
    queryKey: ['product', sourceId],
    queryFn: () => productsApi.getBySourceId(sourceId),
    enabled: !!sourceId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductDetail = (sourceId: string) => {
  return useQuery({
    queryKey: ['productDetail', sourceId],
    queryFn: () => productDetailsApi.getBySourceId(sourceId),
    enabled: !!sourceId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();
  
  return (sourceId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['product', sourceId],
      queryFn: () => productsApi.getBySourceId(sourceId),
      staleTime: 5 * 60 * 1000,
    });
  };
};
