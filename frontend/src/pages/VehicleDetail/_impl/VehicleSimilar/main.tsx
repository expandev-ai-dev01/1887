import type { VehicleSimilarProps } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { VehicleCard } from '@/domain/vehicle/components';

function VehicleSimilar({ vehicles, onVehicleClick }: VehicleSimilarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Veículos Similares</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={onVehicleClick} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { VehicleSimilar };
