import type { VehicleItem } from '@/domain/vehicle/types';

export interface VehicleItemsProps {
  itensSerie: VehicleItem[];
  opcionais?: VehicleItem[];
}
