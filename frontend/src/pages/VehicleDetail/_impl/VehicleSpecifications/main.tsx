import type { VehicleSpecificationsProps } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { formatKilometers } from '@/domain/vehicle/utils';

function VehicleSpecifications({ specifications }: VehicleSpecificationsProps) {
  const specs = [
    { label: 'Marca', value: specifications.marca },
    { label: 'Modelo', value: specifications.modelo },
    { label: 'Ano Fabricação', value: specifications.ano_fabricacao.toString() },
    { label: 'Ano Modelo', value: specifications.ano_modelo.toString() },
    { label: 'Quilometragem', value: formatKilometers(specifications.quilometragem) },
    { label: 'Combustível', value: specifications.combustivel },
    { label: 'Câmbio', value: specifications.cambio },
    { label: 'Potência', value: specifications.potencia },
    { label: 'Cor', value: specifications.cor },
    { label: 'Portas', value: specifications.portas.toString() },
    { label: 'Carroceria', value: specifications.carroceria },
    { label: 'Motor', value: specifications.motor },
    { label: 'Final da Placa', value: specifications.final_placa.toString() },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Especificações Técnicas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec, index) => (
            <div key={index} className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">{spec.label}</p>
              <p className="text-base font-semibold">{spec.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export { VehicleSpecifications };
