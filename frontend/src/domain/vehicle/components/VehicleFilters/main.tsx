import { useState, useEffect } from 'react';
import { Button } from '@/core/components/button';
import { Label } from '@/core/components/label';
import { Input } from '@/core/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import { Checkbox } from '@/core/components/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';
import { useFilterOptions } from '../../hooks';
import type { VehicleFiltersProps } from './types';
import { FilterX, Search } from 'lucide-react';

function VehicleFilters({ filters, onFiltersChange, onApply, onClear }: VehicleFiltersProps) {
  const { marcas, modelos, anos, cambios, isLoading } = useFilterOptions();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleMarcaChange = (marca: string, checked: boolean) => {
    const currentMarcas = localFilters.marca ?? [];
    const newMarcas = checked
      ? [...currentMarcas, marca]
      : currentMarcas.filter((m) => m !== marca);

    const updatedFilters = {
      ...localFilters,
      marca: newMarcas.length > 0 ? newMarcas : undefined,
    };

    if (!checked && localFilters.modelo) {
      const filteredModelos = modelos.filter((modelo) => {
        return newMarcas.some((m) => modelo.startsWith(m));
      });
      const newModelos = localFilters.modelo.filter((m) => filteredModelos.includes(m));
      updatedFilters.modelo = newModelos.length > 0 ? newModelos : undefined;
    }

    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleModeloChange = (modelo: string, checked: boolean) => {
    const currentModelos = localFilters.modelo ?? [];
    const newModelos = checked
      ? [...currentModelos, modelo]
      : currentModelos.filter((m) => m !== modelo);

    const updatedFilters = {
      ...localFilters,
      modelo: newModelos.length > 0 ? newModelos : undefined,
    };

    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCambioChange = (cambio: string, checked: boolean) => {
    const currentCambios = localFilters.cambio ?? [];
    const newCambios = checked
      ? [...currentCambios, cambio as any]
      : currentCambios.filter((c) => c !== cambio);

    const updatedFilters = {
      ...localFilters,
      cambio: newCambios.length > 0 ? newCambios : undefined,
    };

    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const availableModelos = localFilters.marca?.length
    ? modelos.filter((modelo) => localFilters.marca?.some((m) => modelo.startsWith(m)))
    : modelos;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">Marca</Label>
          {isLoading ? (
            <div className="text-muted-foreground text-sm">Carregando...</div>
          ) : (
            <div className="space-y-2">
              {marcas.map((marca) => (
                <div key={marca} className="flex items-center space-x-2">
                  <Checkbox
                    id={`marca-${marca}`}
                    checked={localFilters.marca?.includes(marca) ?? false}
                    onCheckedChange={(checked) => handleMarcaChange(marca, checked as boolean)}
                  />
                  <Label htmlFor={`marca-${marca}`} className="cursor-pointer font-normal">
                    {marca}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Modelo</Label>
          {isLoading ? (
            <div className="text-muted-foreground text-sm">Carregando...</div>
          ) : (
            <div className="space-y-2">
              {availableModelos.length === 0 ? (
                <div className="text-muted-foreground text-sm">Selecione uma marca primeiro</div>
              ) : (
                availableModelos.map((modelo) => (
                  <div key={modelo} className="flex items-center space-x-2">
                    <Checkbox
                      id={`modelo-${modelo}`}
                      checked={localFilters.modelo?.includes(modelo) ?? false}
                      onCheckedChange={(checked) => handleModeloChange(modelo, checked as boolean)}
                    />
                    <Label htmlFor={`modelo-${modelo}`} className="cursor-pointer font-normal">
                      {modelo}
                    </Label>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Ano</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="ano-min">Mínimo</Label>
              <Select
                value={localFilters.anoMin?.toString()}
                onValueChange={(value) => {
                  const anoMin = value ? parseInt(value) : undefined;
                  const updatedFilters = { ...localFilters, anoMin };
                  setLocalFilters(updatedFilters);
                  onFiltersChange(updatedFilters);
                }}
              >
                <SelectTrigger id="ano-min">
                  <SelectValue placeholder="Ano mín." />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem
                      key={ano}
                      value={ano.toString()}
                      disabled={localFilters.anoMax !== undefined && ano > localFilters.anoMax}
                    >
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ano-max">Máximo</Label>
              <Select
                value={localFilters.anoMax?.toString()}
                onValueChange={(value) => {
                  const anoMax = value ? parseInt(value) : undefined;
                  const updatedFilters = { ...localFilters, anoMax };
                  setLocalFilters(updatedFilters);
                  onFiltersChange(updatedFilters);
                }}
              >
                <SelectTrigger id="ano-max">
                  <SelectValue placeholder="Ano máx." />
                </SelectTrigger>
                <SelectContent>
                  {anos.map((ano) => (
                    <SelectItem
                      key={ano}
                      value={ano.toString()}
                      disabled={localFilters.anoMin !== undefined && ano < localFilters.anoMin}
                    >
                      {ano}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Preço</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="preco-min">Mínimo</Label>
              <Input
                id="preco-min"
                type="number"
                placeholder="R$ 0"
                min={0}
                value={localFilters.precoMin ?? ''}
                onChange={(e) => {
                  const precoMin = e.target.value ? parseFloat(e.target.value) : undefined;
                  const updatedFilters = { ...localFilters, precoMin };
                  setLocalFilters(updatedFilters);
                  onFiltersChange(updatedFilters);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preco-max">Máximo</Label>
              <Input
                id="preco-max"
                type="number"
                placeholder="R$ 0"
                min={0}
                value={localFilters.precoMax ?? ''}
                onChange={(e) => {
                  const precoMax = e.target.value ? parseFloat(e.target.value) : undefined;
                  const updatedFilters = { ...localFilters, precoMax };
                  setLocalFilters(updatedFilters);
                  onFiltersChange(updatedFilters);
                }}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-base font-semibold">Câmbio</Label>
          <div className="space-y-2">
            {cambios.map((cambio) => (
              <div key={cambio} className="flex items-center space-x-2">
                <Checkbox
                  id={`cambio-${cambio}`}
                  checked={localFilters.cambio?.includes(cambio) ?? false}
                  onCheckedChange={(checked) => handleCambioChange(cambio, checked as boolean)}
                />
                <Label htmlFor={`cambio-${cambio}`} className="cursor-pointer font-normal">
                  {cambio}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <Button onClick={onApply} className="w-full">
            Aplicar Filtros
          </Button>
          <Button onClick={onClear} variant="outline" className="w-full">
            <FilterX className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export { VehicleFilters };
