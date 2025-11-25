import type { VehiclePhoto } from '@/domain/vehicle/types';

export interface VehicleGalleryProps {
  photos: VehiclePhoto[];
  mainPhoto: string;
}
