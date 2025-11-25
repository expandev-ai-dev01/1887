import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useVehicleList } from '@/domain/vehicle/hooks';
import {
  VehicleCard,
  VehicleFilters,
  VehicleSort,
  VehiclePagination,
} from '@/domain/vehicle/components';
import type { VehicleListParams } from '@/domain/vehicle/types';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/core/components/empty';
import { Button } from '@/core/components/button';
import { AlertCircle, Car, PackageX } from 'lucide-react';
import { Skeleton } from '@/core/components/skeleton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/core/components/sheet';
import { Filter } from 'lucide-react';
import { useNavigation } from '@/core/hooks/useNavigation';

function VehicleListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { navigate } = useNavigation();
  const [filters, setFilters] = useState<VehicleListParams>(() => ({
    marca: searchParams.getAll('marca'),
    modelo: searchParams.getAll('modelo'),
    anoMin: searchParams.get('anoMin') ? parseInt(searchParams.get('anoMin')!) : undefined,
    anoMax: searchParams.get('anoMax') ? parseInt(searchParams.get('anoMax')!) : undefined,
    precoMin: searchParams.get('precoMin') ? parseFloat(searchParams.get('precoMin')!) : undefined,
    precoMax: searchParams.get('precoMax') ? parseFloat(searchParams.get('precoMax')!) : undefined,
    cambio: searchParams.getAll('cambio') as any,
    ordenacao: (searchParams.get('ordenacao') as any) || 'Relevância',
    pagina: searchParams.get('pagina') ? parseInt(searchParams.get('pagina')!) : 1,
    itensPorPagina: searchParams.get('itensPorPagina')
      ? (parseInt(searchParams.get('itensPorPagina')!) as 12 | 24 | 36 | 48)
      : 12,
  }));

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const { vehicles, total, pagina, itensPorPagina, totalPaginas, isLoading, isError } =
    useVehicleList({ filters });

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.marca?.length) filters.marca.forEach((m) => params.append('marca', m));
    if (filters.modelo?.length) filters.modelo.forEach((m) => params.append('modelo', m));
    if (filters.anoMin) params.set('anoMin', filters.anoMin.toString());
    if (filters.anoMax) params.set('anoMax', filters.anoMax.toString());
    if (filters.precoMin) params.set('precoMin', filters.precoMin.toString());
    if (filters.precoMax) params.set('precoMax', filters.precoMax.toString());
    if (filters.cambio?.length) filters.cambio.forEach((c) => params.append('cambio', c));
    if (filters.ordenacao) params.set('ordenacao', filters.ordenacao);
    if (filters.pagina) params.set('pagina', filters.pagina.toString());
    if (filters.itensPorPagina) params.set('itensPorPagina', filters.itensPorPagina.toString());

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    if (totalPaginas > 0 && pagina > totalPaginas) {
      setFilters((prev) => ({ ...prev, pagina: totalPaginas }));
    }
  }, [totalPaginas, pagina]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pagina]);

  const handleFiltersChange = (newFilters: VehicleListParams) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({ ...prev, pagina: 1 }));
    setIsFilterSheetOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters: VehicleListParams = {
      ordenacao: 'Relevância',
      pagina: 1,
      itensPorPagina: 12,
    };
    setFilters(clearedFilters);
    setIsFilterSheetOpen(false);
  };

  const handleSortChange = (ordenacao: VehicleListParams['ordenacao']) => {
    setFilters((prev) => ({ ...prev, ordenacao }));
  };

  const handlePageChange = (pagina: number) => {
    setFilters((prev) => ({ ...prev, pagina }));
  };

  const handleItemsPerPageChange = (itensPorPagina: number) => {
    setFilters((prev) => ({
      ...prev,
      itensPorPagina: itensPorPagina as 12 | 24 | 36 | 48,
      pagina: 1,
    }));
  };

  const handleVehicleClick = (vehicleId: string) => {
    navigate(`/veiculo/${vehicleId}`);
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar veículos</AlertTitle>
          <AlertDescription>
            Ocorreu um erro ao carregar os dados. Por favor, tente novamente.
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">Catálogo de Veículos</h1>
        <p className="text-muted-foreground text-lg">Encontre o carro perfeito para você</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="hidden w-full lg:block lg:w-80">
          <div className="sticky top-6">
            <VehicleFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onApply={handleApplyFilters}
              onClear={handleClearFilters}
            />
          </div>
        </aside>

        <div className="block lg:hidden">
          <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-y-auto sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <VehicleFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onApply={handleApplyFilters}
                  onClear={handleClearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <main className="flex-1">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-muted-foreground text-sm">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                <span>
                  {total} {total === 1 ? 'veículo encontrado' : 'veículos encontrados'}
                </span>
              )}
            </div>
            <VehicleSort value={filters.ordenacao} onChange={handleSortChange} />
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: filters.itensPorPagina ?? 12 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-8 w-1/3" />
                </div>
              ))}
            </div>
          ) : total === 0 && !isLoading ? (
            <Empty className="min-h-[400px]">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  {vehicles.length === 0 && Object.keys(filters).length <= 3 ? (
                    <PackageX className="h-6 w-6" />
                  ) : (
                    <Car className="h-6 w-6" />
                  )}
                </EmptyMedia>
                <EmptyTitle>
                  {vehicles.length === 0 && Object.keys(filters).length <= 3
                    ? 'Catálogo vazio'
                    : 'Nenhum veículo encontrado'}
                </EmptyTitle>
                <EmptyDescription>
                  {vehicles.length === 0 && Object.keys(filters).length <= 3 ? (
                    <>
                      Não há veículos disponíveis no catálogo no momento. Por favor, volte mais
                      tarde ou entre em contato conosco para mais informações.
                    </>
                  ) : (
                    <>
                      Não encontramos veículos com os filtros selecionados. Tente remover alguns
                      filtros ou alterar os critérios de busca para ampliar os resultados.
                    </>
                  )}
                </EmptyDescription>
              </EmptyHeader>
              {vehicles.length === 0 && Object.keys(filters).length > 3 && (
                <EmptyContent>
                  <Button onClick={handleClearFilters} variant="outline">
                    Limpar Filtros
                  </Button>
                </EmptyContent>
              )}
            </Empty>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={handleVehicleClick} />
                ))}
              </div>

              {totalPaginas > 1 && (
                <div className="mt-8">
                  <VehiclePagination
                    currentPage={pagina}
                    totalPages={totalPaginas}
                    itemsPerPage={itensPorPagina}
                    totalItems={total}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export { VehicleListPage };
