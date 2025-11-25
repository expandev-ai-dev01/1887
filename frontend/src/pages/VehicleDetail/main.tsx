import { useParams } from 'react-router-dom';
import { useVehicleDetail } from '@/domain/vehicle/hooks';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { Button } from '@/core/components/button';
import { useNavigation } from '@/core/hooks/useNavigation';
import { AlertCircle, ArrowLeft, Share2 } from 'lucide-react';
import { VehicleGallery } from './_impl/VehicleGallery';
import { VehicleHeader } from './_impl/VehicleHeader';
import { VehicleSpecifications } from './_impl/VehicleSpecifications';
import { VehicleItems } from './_impl/VehicleItems';
import { VehicleHistory } from './_impl/VehicleHistory';
import { VehicleSaleConditions } from './_impl/VehicleSaleConditions';
import { VehicleSimilar } from './_impl/VehicleSimilar';
import { ContactForm } from '@/domain/contact/components';
import { Separator } from '@/core/components/separator';
import { toast } from 'sonner';

function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { goBack, navigate } = useNavigation();
  const { vehicle, isLoading, isError } = useVehicleDetail({
    vehicleId: id ?? '',
    enabled: !!id,
  });

  const handleShare = async () => {
    if (!vehicle) return;

    const shareData = {
      title: vehicle.titulo_anuncio,
      text: `Confira este ${vehicle.especificacoes.marca} ${
        vehicle.especificacoes.modelo
      } por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        vehicle.preco
      )}`,
      url: vehicle.url_compartilhamento,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(vehicle.url_compartilhamento);
        toast.success('Link copiado para a área de transferência!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSimilarVehicleClick = (vehicleId: string) => {
    navigate(`/veiculo/${vehicleId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSuccess = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Veículo não encontrado</AlertTitle>
          <AlertDescription>
            O identificador do veículo não foi fornecido.
            <Button variant="outline" size="sm" className="mt-2" onClick={goBack}>
              Voltar
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError || !vehicle) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar veículo</AlertTitle>
          <AlertDescription>
            Não foi possível carregar as informações do veículo. Por favor, tente novamente.
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" onClick={goBack}>
                Voltar
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                Tentar novamente
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="h-4 w-4" />
          Compartilhar
        </Button>
      </div>

      <div className="space-y-8">
        <VehicleGallery photos={vehicle.fotos} mainPhoto={vehicle.foto_principal} />

        <VehicleHeader
          titulo={vehicle.titulo_anuncio}
          preco={vehicle.preco}
          status={vehicle.status_veiculo}
        />

        <Separator />

        <VehicleSpecifications specifications={vehicle.especificacoes} />

        <Separator />

        <VehicleItems itensSerie={vehicle.itens_serie} opcionais={vehicle.opcionais} />

        <Separator />

        <VehicleHistory history={vehicle.historico} />

        <Separator />

        <VehicleSaleConditions conditions={vehicle.condicoes_venda} />

        <Separator />

        <ContactForm
          vehicleId={vehicle.id}
          vehicleModel={`${vehicle.especificacoes.marca} ${vehicle.especificacoes.modelo} (${vehicle.especificacoes.ano_modelo})`}
          onSuccess={handleContactSuccess}
        />

        {vehicle.veiculos_similares && vehicle.veiculos_similares.length > 0 && (
          <>
            <Separator />
            <VehicleSimilar
              vehicles={vehicle.veiculos_similares}
              onVehicleClick={handleSimilarVehicleClick}
            />
          </>
        )}
      </div>
    </div>
  );
}

export { VehicleDetailPage };
