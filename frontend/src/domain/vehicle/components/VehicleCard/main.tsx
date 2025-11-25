import { Card, CardContent, CardHeader } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { formatPrice, formatKilometers, formatYear } from '../../utils';
import type { VehicleCardProps } from './types';
import { cn } from '@/core/lib/utils';

function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
  const handleClick = () => {
    onClick?.(vehicle.id);
  };

  return (
    <Card
      className={cn(
        'group cursor-pointer overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg',
        'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={vehicle.imagem_principal}
          alt={`${vehicle.marca} ${vehicle.modelo}`}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-car.jpg';
          }}
        />
      </div>
      <CardHeader className="gap-2 pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-semibold leading-tight">
            {vehicle.marca} {vehicle.modelo}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm">{formatYear(vehicle.ano)}</p>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-center justify-between">
          <span className="text-primary text-2xl font-bold">{formatPrice(vehicle.preco)}</span>
        </div>
        {(vehicle.quilometragem !== undefined || vehicle.cambio) && (
          <div className="flex flex-wrap gap-2">
            {vehicle.quilometragem !== undefined && (
              <Badge variant="secondary" className="text-xs">
                {formatKilometers(vehicle.quilometragem)}
              </Badge>
            )}
            {vehicle.cambio && (
              <Badge variant="outline" className="text-xs">
                {vehicle.cambio}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { VehicleCard };
