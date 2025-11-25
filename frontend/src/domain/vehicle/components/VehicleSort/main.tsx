import { Label } from '@/core/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import type { VehicleSortProps } from './types';
import { ArrowUpDown } from 'lucide-react';

const sortOptions = [
  { value: 'Relevância', label: 'Relevância' },
  { value: 'Preço (menor para maior)', label: 'Preço (menor para maior)' },
  { value: 'Preço (maior para menor)', label: 'Preço (maior para menor)' },
  { value: 'Ano (mais recente)', label: 'Ano (mais recente)' },
  { value: 'Ano (mais antigo)', label: 'Ano (mais antigo)' },
  { value: 'Modelo (A-Z)', label: 'Modelo (A-Z)' },
  { value: 'Modelo (Z-A)', label: 'Modelo (Z-A)' },
] as const;

type SortValue = (typeof sortOptions)[number]['value'];

function VehicleSort({ value, onChange }: VehicleSortProps) {
  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor="sort"
        className="flex items-center gap-2 whitespace-nowrap text-sm font-medium"
      >
        <ArrowUpDown className="h-4 w-4" />
        Ordenar por:
      </Label>
      <Select value={value} onValueChange={(val) => onChange(val as SortValue)}>
        <SelectTrigger id="sort" className="w-[220px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export { VehicleSort };
