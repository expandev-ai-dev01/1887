import { useQuery } from '@tanstack/react-query';
import { vehicleService } from '../../services';

export const useFilterOptions = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['vehicle-filter-options'],
    queryFn: () => vehicleService.getFilterOptions(),
    staleTime: 1000 * 60 * 10,
  });

  return {
    marcas: data?.marcas ?? [],
    modelos: data?.modelos ?? [],
    anos: data?.anos ?? [],
    cambios: data?.cambios ?? [],
    isLoading,
    isError,
  };
};
