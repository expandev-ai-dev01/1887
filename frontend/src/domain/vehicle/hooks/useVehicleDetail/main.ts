import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';
import type { UseVehicleDetailOptions } from './types';

export const useVehicleDetail = (options: UseVehicleDetailOptions) => {
  const { vehicleId, enabled = true } = options;

  const queryKey = ['vehicle-detail', vehicleId];

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () => vehicleService.getById(vehicleId),
    enabled: enabled && !!vehicleId,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    retryDelay: 2000,
  });

  return {
    vehicle: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
