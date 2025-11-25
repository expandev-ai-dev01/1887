import type { VehicleListParams } from '../../types';

export interface VehicleFiltersProps {
  filters: VehicleListParams;
  onFiltersChange: (filters: VehicleListParams) => void;
  onApply: () => void;
  onClear: () => void;
}
