import type { VehicleSaleConditionsProps } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Separator } from '@/core/components/separator';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

function VehicleSaleConditions({ conditions }: VehicleSaleConditionsProps) {
  const getStatusIcon = () => {
    switch (conditions.situacao_documental.status) {
      case 'regular':
        return <CheckCircle2 className="text-primary h-5 w-5" />;
      case 'pendente':
        return <XCircle className="text-destructive h-5 w-5" />;
      case 'em_andamento':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusLabel = () => {
    switch (conditions.situacao_documental.status) {
      case 'regular':
        return 'Regular';
      case 'pendente':
        return 'Pendente';
      case 'em_andamento':
        return 'Em Andamento';
    }
  };

  const getStatusVariant = () => {
    switch (conditions.situacao_documental.status) {
      case 'regular':
        return 'default';
      case 'pendente':
        return 'destructive';
      case 'em_andamento':
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Condições de Venda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Formas de Pagamento</h3>
          <div className="flex flex-wrap gap-2">
            {conditions.formas_pagamento.map((forma, index) => (
              <Badge key={index} variant="outline">
                {forma}
              </Badge>
            ))}
          </div>
        </div>

        {conditions.condicoes_financiamento && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Condições de Financiamento</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm font-medium">Entrada Mínima</p>
                  <p className="text-base font-semibold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'percent',
                      minimumFractionDigits: 0,
                    }).format(conditions.condicoes_financiamento.entrada_minima / 100)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm font-medium">Taxa de Juros</p>
                  <p className="text-base font-semibold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'percent',
                      minimumFractionDigits: 2,
                    }).format(conditions.condicoes_financiamento.taxa_juros / 100)}{' '}
                    a.m.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm font-medium">Prazo Máximo</p>
                  <p className="text-base font-semibold">
                    {conditions.condicoes_financiamento.prazo_maximo} meses
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Aceita Troca</h3>
            {conditions.aceita_troca ? (
              <Badge variant="default">Sim</Badge>
            ) : (
              <Badge variant="secondary">Não</Badge>
            )}
          </div>
        </div>

        {conditions.observacoes_venda && (
          <>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Observações</h3>
              <p className="text-muted-foreground text-sm">{conditions.observacoes_venda}</p>
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Documentação Necessária</h3>
          <div className="space-y-2">
            {conditions.documentacao_necessaria.map((doc, index) => (
              <div key={index} className="rounded-lg border p-3">
                <p className="font-medium">{doc.nome}</p>
                {doc.observacoes && (
                  <p className="text-muted-foreground text-sm">{doc.observacoes}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Situação Documental</h3>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Status:</p>
                  <Badge variant={getStatusVariant()}>{getStatusLabel()}</Badge>
                </div>
                {conditions.situacao_documental.observacoes && (
                  <p className="text-muted-foreground mt-2 text-sm">
                    {conditions.situacao_documental.observacoes}
                  </p>
                )}
              </div>
            </div>
            {conditions.situacao_documental.pendencias &&
              conditions.situacao_documental.pendencias.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Pendências:</p>
                  <ul className="text-muted-foreground ml-4 list-disc space-y-1 text-sm">
                    {conditions.situacao_documental.pendencias.map((pendencia, index) => (
                      <li key={index}>{pendencia}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { VehicleSaleConditions };
