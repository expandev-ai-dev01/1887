import type { Vehicle } from '../../types';

export interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: (vehicleId: string) => void;
}
