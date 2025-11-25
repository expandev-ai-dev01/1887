export interface Vehicle {
  id: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagem_principal: string;
  quilometragem?: number;
  cambio?: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático';
}

export interface VehicleListParams {
  marca?: string[];
  modelo?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambio?: Array<'Manual' | 'Automático' | 'CVT' | 'Semi-automático'>;
  ordenacao?:
    | 'Relevância'
    | 'Preço (menor para maior)'
    | 'Preço (maior para menor)'
    | 'Ano (mais recente)'
    | 'Ano (mais antigo)'
    | 'Modelo (A-Z)'
    | 'Modelo (Z-A)';
  pagina?: number;
  itensPorPagina?: 12 | 24 | 36 | 48;
}

export interface VehicleListResponse {
  data: Vehicle[];
  total: number;
  pagina: number;
  itensPorPagina: number;
  totalPaginas: number;
}

export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: Array<'Manual' | 'Automático' | 'CVT' | 'Semi-automático'>;
}

export interface VehiclePhoto {
  url: string;
  legenda?: string;
}

export interface VehicleSpecification {
  marca: string;
  modelo: string;
  ano_fabricacao: number;
  ano_modelo: number;
  quilometragem: number;
  combustivel: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Híbrido';
  cambio: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático' | 'Automatizado';
  potencia: string;
  cor: string;
  portas: number;
  carroceria: 'Hatch' | 'Sedan' | 'SUV' | 'Picape' | 'Minivan' | 'Conversível' | 'Cupê' | 'Wagon';
  motor: string;
  final_placa: number;
}

export interface VehicleItem {
  nome: string;
  categoria: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
}

export interface VehicleHistory {
  procedencia: 'Particular' | 'Concessionária' | 'Leilão' | 'Importado' | 'Locadora';
  proprietarios: number;
  garantia?: string;
  revisoes?: Array<{
    data: string;
    quilometragem: number;
    local: string;
  }>;
  sinistros?: Array<{
    data: string;
    tipo: string;
    descricao: string;
  }>;
  laudo_tecnico?: {
    data_inspecao: string;
    resultado: string;
  };
}

export interface VehicleSaleConditions {
  formas_pagamento: Array<'À vista' | 'Financiamento' | 'Consórcio' | 'Leasing'>;
  condicoes_financiamento?: {
    entrada_minima: number;
    taxa_juros: number;
    prazo_maximo: number;
  };
  aceita_troca: boolean;
  observacoes_venda?: string;
  documentacao_necessaria: Array<{
    nome: string;
    observacoes?: string;
  }>;
  situacao_documental: {
    status: 'regular' | 'pendente' | 'em_andamento';
    pendencias?: string[];
    observacoes?: string;
  };
}

export interface VehicleDetail {
  id: string;
  titulo_anuncio: string;
  preco: number;
  status_veiculo: 'Disponível' | 'Reservado' | 'Vendido';
  fotos: VehiclePhoto[];
  foto_principal: string;
  especificacoes: VehicleSpecification;
  itens_serie: VehicleItem[];
  opcionais?: VehicleItem[];
  historico: VehicleHistory;
  condicoes_venda: VehicleSaleConditions;
  url_compartilhamento: string;
  veiculos_similares?: Vehicle[];
}
