import { useState } from 'react';
import type { VehicleItemsProps } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Badge } from '@/core/components/badge';
import { Button } from '@/core/components/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/core/components/separator';

const ITEMS_LIMIT = 10;

function VehicleItems({ itensSerie, opcionais }: VehicleItemsProps) {
  const [showAllSerie, setShowAllSerie] = useState(false);
  const [showAllOpcionais, setShowAllOpcionais] = useState(false);

  const groupByCategory = (items: typeof itensSerie) => {
    return items.reduce((acc, item) => {
      if (!acc[item.categoria]) {
        acc[item.categoria] = [];
      }
      acc[item.categoria].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  };

  const renderItemGroup = (
    title: string,
    items: typeof itensSerie,
    showAll: boolean,
    setShowAll: (value: boolean) => void
  ) => {
    const grouped = groupByCategory(items);
    const categories = Object.keys(grouped);

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {categories.map((category) => {
          const categoryItems = grouped[category];
          const displayItems = showAll ? categoryItems : categoryItems.slice(0, ITEMS_LIMIT);
          const hasMore = categoryItems.length > ITEMS_LIMIT;

          return (
            <div key={category} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline">{category}</Badge>
                <span className="text-muted-foreground text-sm">({categoryItems.length})</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {displayItems.map((item, index) => (
                  <div
                    key={index}
                    className="hover:bg-muted/50 flex items-center gap-2 rounded-md border p-3 transition-colors"
                  >
                    <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                      <span className="text-primary text-xs font-semibold">
                        {item.nome.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm">{item.nome}</span>
                  </div>
                ))}
              </div>
              {hasMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAll(!showAll)}
                  className="w-full"
                >
                  {showAll ? (
                    <>
                      Ver menos <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Ver mais ({categoryItems.length - ITEMS_LIMIT} itens){' '}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Itens e Opcionais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderItemGroup('Itens de Série', itensSerie, showAllSerie, setShowAllSerie)}
        {opcionais && opcionais.length > 0 && (
          <>
            <Separator />
            {renderItemGroup('Opcionais', opcionais, showAllOpcionais, setShowAllOpcionais)}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export { VehicleItems };
