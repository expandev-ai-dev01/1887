import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import type { UseVehicleListOptions } from './types';

export const useVehicleList = (options: UseVehicleListOptions = {}) => {
  const { filters, enabled = true } = options;

  const queryKey = ['vehicles', filters];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.list(filters),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 2000,
  });

  return {
    vehicles: data?.data ?? [],
    total: data?.total ?? 0,
    pagina: data?.pagina ?? 1,
    itensPorPagina: data?.itensPorPagina ?? 12,
    totalPaginas: data?.totalPaginas ?? 0,
    isLoading,
    isError,
    error,
    refetch,
  };
};
