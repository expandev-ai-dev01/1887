import type { Vehicle } from '@/domain/vehicle/types';

export interface VehicleSimilarProps {
  vehicles: Vehicle[];
  onVehicleClick: (vehicleId: string) => void;
}
