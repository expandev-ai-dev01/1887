import type { VehicleHeaderProps } from './types';
import { Badge } from '@/core/components/badge';
import { formatPrice } from '@/domain/vehicle/utils';

function VehicleHeader({ titulo, preco, status }: VehicleHeaderProps) {
  const getStatusVariant = () => {
    switch (status) {
      case 'Disponível':
        return 'default';
      case 'Reservado':
        return 'secondary';
      case 'Vendido':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{titulo}</h1>
          <Badge variant={getStatusVariant()} className="w-fit">
            {status}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-sm">Preço</p>
          <p className="text-primary text-3xl font-bold md:text-4xl">{formatPrice(preco)}</p>
        </div>
      </div>
    </div>
  );
}

export { VehicleHeader };
