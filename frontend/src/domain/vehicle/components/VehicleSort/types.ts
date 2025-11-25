import type { VehicleListParams } from '../../types';

export interface VehicleSortProps {
  value: VehicleListParams['ordenacao'];
  onChange: (value: VehicleListParams['ordenacao']) => void;
}
