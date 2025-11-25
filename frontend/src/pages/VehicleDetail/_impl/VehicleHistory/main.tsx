import type { VehicleHistoryProps } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Separator } from '@/core/components/separator';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function VehicleHistory({ history }: VehicleHistoryProps) {
  const hasSinistros = history.sinistros !== undefined && history.sinistros.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico do Veículo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Procedência</p>
            <p className="text-base font-semibold">{history.procedencia}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm font-medium">Proprietários Anteriores</p>
            <p className="text-base font-semibold">{history.proprietarios}</p>
          </div>
          {history.garantia && (
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm font-medium">Garantia</p>
              <p className="text-base font-semibold">{history.garantia}</p>
            </div>
          )}
        </div>

        {!hasSinistros && (
          <div className="bg-primary/5 border-primary/20 flex items-center gap-3 rounded-lg border p-4">
            <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
            <div>
              <p className="font-semibold">Sem registro de sinistros</p>
              <p className="text-muted-foreground text-sm">
                Este veículo não possui histórico de acidentes registrados
              </p>
            </div>
          </div>
        )}

        {history.revisoes && history.revisoes.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">Revisões</h3>
                <Badge variant="secondary">{history.revisoes.length}</Badge>
              </div>
              <div className="space-y-2">
                {history.revisoes.map((revisao, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium">{revisao.local}</p>
                        <p className="text-muted-foreground text-sm">
                          {format(parseISO(revisao.data), "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {revisao.quilometragem.toLocaleString('pt-BR')} km
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {hasSinistros && history.sinistros && (
          <>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-destructive h-5 w-5" />
                <h3 className="text-lg font-semibold">Sinistros</h3>
                <Badge variant="destructive">{history.sinistros.length}</Badge>
              </div>
              <div className="space-y-2">
                {history.sinistros.map((sinistro, index) => (
                  <div key={index} className="border-destructive/20 rounded-lg border p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{sinistro.tipo}</p>
                          <p className="text-muted-foreground text-sm">
                            {format(parseISO(sinistro.data), "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm">{sinistro.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {history.laudo_tecnico && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Laudo Técnico</h3>
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">Data da Inspeção</p>
                    <p className="font-medium">
                      {format(
                        parseISO(history.laudo_tecnico.data_inspecao),
                        "dd 'de' MMMM 'de' yyyy",
                        {
                          locale: ptBR,
                        }
                      )}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Resultado</p>
                    <p className="text-base">{history.laudo_tecnico.resultado}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export { VehicleHistory };
