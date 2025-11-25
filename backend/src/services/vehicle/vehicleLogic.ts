/**
 * @summary
 * Vehicle business logic for listing, filtering, sorting, pagination, and detail retrieval.
 * Implements in-memory data storage and processing for vehicle catalog.
 *
 * @module services/vehicle/vehicleLogic
 */

import {
  VehicleListParams,
  VehicleListResponse,
  Vehicle,
  FilterOptions,
  VehicleDetail,
} from './vehicleTypes';

/**
 * @rule {be-database-requirement}
 * In-memory vehicle storage (no database persistence)
 */
const vehicles: Vehicle[] = [
  {
    idVeiculo: '1',
    modelo: 'Civic',
    marca: 'Honda',
    ano: 2023,
    preco: 135000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+Civic+2023',
    quilometragem: 15000,
    cambio: 'Automático',
  },
  {
    idVeiculo: '2',
    modelo: 'Corolla',
    marca: 'Toyota',
    ano: 2022,
    preco: 125000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Toyota+Corolla+2022',
    quilometragem: 25000,
    cambio: 'CVT',
  },
  {
    idVeiculo: '3',
    modelo: 'Onix',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 75000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Onix+2023',
    quilometragem: 8000,
    cambio: 'Manual',
  },
  {
    idVeiculo: '4',
    modelo: 'HB20',
    marca: 'Hyundai',
    ano: 2021,
    preco: 65000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+HB20+2021',
    quilometragem: 35000,
    cambio: 'Manual',
  },
  {
    idVeiculo: '5',
    modelo: 'Compass',
    marca: 'Jeep',
    ano: 2023,
    preco: 185000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Compass+2023',
    quilometragem: 5000,
    cambio: 'Automático',
  },
  {
    idVeiculo: '6',
    modelo: 'Gol',
    marca: 'Volkswagen',
    ano: 2020,
    preco: 55000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+Gol+2020',
    quilometragem: 45000,
    cambio: 'Manual',
  },
  {
    idVeiculo: '7',
    modelo: 'Kicks',
    marca: 'Nissan',
    ano: 2022,
    preco: 95000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Nissan+Kicks+2022',
    quilometragem: 18000,
    cambio: 'CVT',
  },
  {
    idVeiculo: '8',
    modelo: 'Argo',
    marca: 'Fiat',
    ano: 2023,
    preco: 72000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Fiat+Argo+2023',
    quilometragem: 12000,
    cambio: 'Manual',
  },
  {
    idVeiculo: '9',
    modelo: 'Creta',
    marca: 'Hyundai',
    ano: 2023,
    preco: 115000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Hyundai+Creta+2023',
    quilometragem: 7000,
    cambio: 'Automático',
  },
  {
    idVeiculo: '10',
    modelo: 'T-Cross',
    marca: 'Volkswagen',
    ano: 2022,
    preco: 125000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+T-Cross+2022',
    quilometragem: 22000,
    cambio: 'Automático',
  },
  {
    idVeiculo: '11',
    modelo: 'Renegade',
    marca: 'Jeep',
    ano: 2021,
    preco: 105000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Jeep+Renegade+2021',
    quilometragem: 30000,
    cambio: 'Automático',
  },
  {
    idVeiculo: '12',
    modelo: 'Tracker',
    marca: 'Chevrolet',
    ano: 2023,
    preco: 145000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Chevrolet+Tracker+2023',
    quilometragem: 3000,
    cambio: 'Automático',
  },
  {
    idVeiculo: '13',
    modelo: 'Polo',
    marca: 'Volkswagen',
    ano: 2022,
    preco: 85000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=VW+Polo+2022',
    quilometragem: 20000,
    cambio: 'Manual',
  },
  {
    idVeiculo: '14',
    modelo: 'Cronos',
    marca: 'Fiat',
    ano: 2021,
    preco: 68000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Fiat+Cronos+2021',
    quilometragem: 28000,
    cambio: 'Manual',
  },
  {
    idVeiculo: '15',
    modelo: 'HR-V',
    marca: 'Honda',
    ano: 2022,
    preco: 155000.0,
    imagemPrincipal: 'https://via.placeholder.com/300x169?text=Honda+HR-V+2022',
    quilometragem: 16000,
    cambio: 'CVT',
  },
];

/**
 * @rule {be-database-requirement}
 * In-memory detailed vehicle data storage
 */
const vehicleDetails: Map<string, VehicleDetail> = new Map([
  [
    '1',
    {
      idVeiculo: '1',
      tituloAnuncio: 'Honda Civic 2023',
      modelo: 'Civic',
      marca: 'Honda',
      anoFabricacao: 2023,
      anoModelo: 2023,
      preco: 135000.0,
      statusVeiculo: 'Disponível',
      quilometragem: 15000,
      combustivel: 'Flex',
      cambio: 'Automático',
      potencia: '155 cv',
      cor: 'Prata',
      portas: 4,
      carroceria: 'Sedan',
      motor: '2.0',
      finalPlaca: 5,
      fotos: [
        {
          url: 'https://via.placeholder.com/800x450?text=Honda+Civic+2023+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x450?text=Honda+Civic+2023+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
        {
          url: 'https://via.placeholder.com/800x450?text=Honda+Civic+2023+Interior',
          legenda: 'Interior',
          principal: false,
        },
      ],
      modoAmpliacao: 'ambos',
      nivelZoom: 200,
      itensSerie: [
        { nome: 'Ar-condicionado digital', categoria: 'Conforto' },
        { nome: 'Direção elétrica', categoria: 'Conforto' },
        { nome: 'Vidros elétricos', categoria: 'Conforto' },
        { nome: 'Travas elétricas', categoria: 'Conforto' },
        { nome: 'Airbags frontais', categoria: 'Segurança' },
        { nome: 'Freios ABS', categoria: 'Segurança' },
        { nome: 'Controle de estabilidade', categoria: 'Segurança' },
        { nome: 'Central multimídia', categoria: 'Tecnologia' },
      ],
      opcionais: [
        { nome: 'Teto solar', categoria: 'Conforto' },
        { nome: 'Bancos de couro', categoria: 'Conforto' },
        { nome: 'Sensor de estacionamento', categoria: 'Tecnologia' },
        { nome: 'Câmera de ré', categoria: 'Tecnologia' },
      ],
      limiteItensVisivel: 10,
      procedencia: 'Concessionária',
      proprietarios: 1,
      garantia: 'Até 12/2025',
      revisoes: [
        { data: '2023-06-15', quilometragem: 5000, local: 'Concessionária Honda' },
        { data: '2023-12-10', quilometragem: 10000, local: 'Concessionária Honda' },
      ],
      sinistros: [],
      laudoTecnico: {
        dataInspecao: '2024-01-15',
        resultadoGeral: 'Aprovado',
        observacoes: 'Veículo em excelente estado de conservação',
      },
      formasPagamento: ['À vista', 'Financiamento'],
      condicoesFinanciamento: {
        entradaMinima: 27000.0,
        taxaJuros: 1.49,
        prazoMaximo: 60,
      },
      aceitaTroca: true,
      observacoesVenda: 'Aceita veículo como parte do pagamento',
      documentacaoNecessaria: [
        { documento: 'RG e CPF', observacao: 'Original e cópia' },
        { documento: 'Comprovante de residência', observacao: 'Atualizado (últimos 3 meses)' },
        { documento: 'Comprovante de renda', observacao: 'Para financiamento' },
      ],
      situacaoDocumental: {
        status: 'Regular',
        pendencias: [],
        observacoes: 'Documentação completa e regularizada',
      },
      urlCompartilhamento: '/vehicle/honda-civic-2023-1',
      redesSociais: ['Facebook', 'WhatsApp', 'Email'],
      textoCompartilhamento: 'Confira este Honda Civic 2023 por R$ 135.000,00',
    },
  ],
  [
    '2',
    {
      idVeiculo: '2',
      tituloAnuncio: 'Toyota Corolla 2022',
      modelo: 'Corolla',
      marca: 'Toyota',
      anoFabricacao: 2022,
      anoModelo: 2022,
      preco: 125000.0,
      statusVeiculo: 'Disponível',
      quilometragem: 25000,
      combustivel: 'Flex',
      cambio: 'CVT',
      potencia: '144 cv',
      cor: 'Branco',
      portas: 4,
      carroceria: 'Sedan',
      motor: '2.0',
      finalPlaca: 3,
      fotos: [
        {
          url: 'https://via.placeholder.com/800x450?text=Toyota+Corolla+2022+Front',
          legenda: 'Vista frontal',
          principal: true,
        },
        {
          url: 'https://via.placeholder.com/800x450?text=Toyota+Corolla+2022+Side',
          legenda: 'Vista lateral',
          principal: false,
        },
      ],
      modoAmpliacao: 'lightbox',
      nivelZoom: 200,
      itensSerie: [
        { nome: 'Ar-condicionado automático', categoria: 'Conforto' },
        { nome: 'Direção elétrica', categoria: 'Conforto' },
        { nome: 'Vidros elétricos', categoria: 'Conforto' },
        { nome: 'Airbags múltiplos', categoria: 'Segurança' },
        { nome: 'Freios ABS', categoria: 'Segurança' },
        { nome: 'Central multimídia', categoria: 'Tecnologia' },
      ],
      opcionais: [
        { nome: 'Bancos de couro', categoria: 'Conforto' },
        { nome: 'Sensor de estacionamento', categoria: 'Tecnologia' },
      ],
      limiteItensVisivel: 10,
      procedencia: 'Particular',
      proprietarios: 1,
      garantia: 'Até 06/2025',
      revisoes: [
        { data: '2022-08-20', quilometragem: 10000, local: 'Concessionária Toyota' },
        { data: '2023-02-15', quilometragem: 20000, local: 'Concessionária Toyota' },
      ],
      sinistros: [],
      laudoTecnico: {
        dataInspecao: '2024-01-10',
        resultadoGeral: 'Aprovado',
        observacoes: 'Veículo bem conservado',
      },
      formasPagamento: ['À vista', 'Financiamento'],
      condicoesFinanciamento: {
        entradaMinima: 25000.0,
        taxaJuros: 1.59,
        prazoMaximo: 48,
      },
      aceitaTroca: true,
      observacoesVenda: '',
      documentacaoNecessaria: [
        { documento: 'RG e CPF', observacao: 'Original e cópia' },
        { documento: 'Comprovante de residência', observacao: 'Atualizado' },
      ],
      situacaoDocumental: {
        status: 'Regular',
        pendencias: [],
        observacoes: 'Documentação em dia',
      },
      urlCompartilhamento: '/vehicle/toyota-corolla-2022-2',
      redesSociais: ['Facebook', 'WhatsApp', 'Email'],
      textoCompartilhamento: 'Confira este Toyota Corolla 2022 por R$ 125.000,00',
    },
  ],
]);

/**
 * @summary
 * Applies filtering logic to vehicle list
 *
 * @function applyFilters
 * @param {Vehicle[]} vehicleList - List of vehicles to filter
 * @param {VehicleListParams} params - Filter parameters
 * @returns {Vehicle[]} Filtered vehicle list
 */
function applyFilters(vehicleList: Vehicle[], params: VehicleListParams): Vehicle[] {
  let filtered = [...vehicleList];

  /**
   * @rule {fn-order-processing}
   * Filter by brand (multiple selection)
   */
  if (params.marca && params.marca.length > 0) {
    filtered = filtered.filter((v) => params.marca!.includes(v.marca));
  }

  /**
   * @rule {fn-order-processing}
   * Filter by model (multiple selection)
   */
  if (params.modelo && params.modelo.length > 0) {
    filtered = filtered.filter((v) => params.modelo!.includes(v.modelo));
  }

  /**
   * @rule {fn-order-processing}
   * Filter by year range
   */
  if (params.anoMin !== undefined) {
    filtered = filtered.filter((v) => v.ano >= params.anoMin!);
  }
  if (params.anoMax !== undefined) {
    filtered = filtered.filter((v) => v.ano <= params.anoMax!);
  }

  /**
   * @rule {fn-order-processing}
   * Filter by price range
   */
  if (params.precoMin !== undefined) {
    filtered = filtered.filter((v) => v.preco >= params.precoMin!);
  }
  if (params.precoMax !== undefined) {
    filtered = filtered.filter((v) => v.preco <= params.precoMax!);
  }

  /**
   * @rule {fn-order-processing}
   * Filter by transmission type (multiple selection)
   */
  if (params.cambio && params.cambio.length > 0) {
    filtered = filtered.filter((v) => v.cambio && params.cambio!.includes(v.cambio));
  }

  return filtered;
}

/**
 * @summary
 * Applies sorting logic to vehicle list
 *
 * @function applySorting
 * @param {Vehicle[]} vehicleList - List of vehicles to sort
 * @param {string} ordenacao - Sorting criteria
 * @returns {Vehicle[]} Sorted vehicle list
 */
function applySorting(vehicleList: Vehicle[], ordenacao: string): Vehicle[] {
  const sorted = [...vehicleList];

  switch (ordenacao) {
    case 'Preço (menor para maior)':
      return sorted.sort((a, b) => a.preco - b.preco);

    case 'Preço (maior para menor)':
      return sorted.sort((a, b) => b.preco - a.preco);

    case 'Ano (mais recente)':
      return sorted.sort((a, b) => b.ano - a.ano);

    case 'Ano (mais antigo)':
      return sorted.sort((a, b) => a.ano - b.ano);

    case 'Modelo (A-Z)':
      return sorted.sort((a, b) => a.modelo.localeCompare(b.modelo));

    case 'Modelo (Z-A)':
      return sorted.sort((a, b) => b.modelo.localeCompare(a.modelo));

    case 'Relevância':
    default:
      return sorted;
  }
}

/**
 * @summary
 * Applies pagination to vehicle list
 *
 * @function applyPagination
 * @param {Vehicle[]} vehicleList - List of vehicles to paginate
 * @param {number} pagina - Current page number
 * @param {number} itensPorPagina - Items per page
 * @returns {Vehicle[]} Paginated vehicle list
 */
function applyPagination(
  vehicleList: Vehicle[],
  pagina: number,
  itensPorPagina: number
): Vehicle[] {
  const startIndex = (pagina - 1) * itensPorPagina;
  const endIndex = startIndex + itensPorPagina;
  return vehicleList.slice(startIndex, endIndex);
}

/**
 * @summary
 * Lists vehicles with filtering, sorting, and pagination
 *
 * @function vehicleList
 * @param {VehicleListParams} params - List parameters
 * @returns {Promise<VehicleListResponse>} Paginated vehicle list with metadata
 */
export async function vehicleList(params: VehicleListParams): Promise<VehicleListResponse> {
  /**
   * @rule {fn-order-processing}
   * Apply filters first
   */
  let filtered = applyFilters(vehicles, params);

  /**
   * @rule {fn-order-processing}
   * Apply sorting
   */
  filtered = applySorting(filtered, params.ordenacao || 'Relevância');

  /**
   * @rule {fn-order-processing}
   * Calculate pagination metadata
   */
  const totalVeiculos = filtered.length;
  const totalPaginas = Math.ceil(totalVeiculos / params.itensPorPagina);
  const paginaAtual = Math.min(params.pagina, totalPaginas || 1);

  /**
   * @rule {fn-order-processing}
   * Apply pagination
   */
  const paginatedVehicles = applyPagination(filtered, paginaAtual, params.itensPorPagina);

  /**
   * @rule {fn-order-processing}
   * Calculate display range
   */
  const inicio = totalVeiculos > 0 ? (paginaAtual - 1) * params.itensPorPagina + 1 : 0;
  const fim = Math.min(paginaAtual * params.itensPorPagina, totalVeiculos);

  return {
    veiculos: paginatedVehicles,
    paginacao: {
      paginaAtual,
      itensPorPagina: params.itensPorPagina,
      totalPaginas,
      totalVeiculos,
      temProxima: paginaAtual < totalPaginas,
      temAnterior: paginaAtual > 1,
      exibindoDe: inicio,
      exibindoAte: fim,
    },
    filtrosAplicados: {
      marca: params.marca || [],
      modelo: params.modelo || [],
      anoMin: params.anoMin,
      anoMax: params.anoMax,
      precoMin: params.precoMin,
      precoMax: params.precoMax,
      cambio: params.cambio || [],
      ordenacao: params.ordenacao || 'Relevância',
    },
  };
}

/**
 * @summary
 * Gets available filter options from current vehicle inventory
 *
 * @function vehicleFilterOptions
 * @returns {Promise<FilterOptions>} Available filter options
 */
export async function vehicleFilterOptions(): Promise<FilterOptions> {
  /**
   * @rule {fn-order-processing}
   * Extract unique brands
   */
  const marcas = Array.from(new Set(vehicles.map((v) => v.marca))).sort();

  /**
   * @rule {fn-order-processing}
   * Extract unique models
   */
  const modelos = Array.from(new Set(vehicles.map((v) => v.modelo))).sort();

  /**
   * @rule {fn-order-processing}
   * Extract year range
   */
  const anos = Array.from(new Set(vehicles.map((v) => v.ano))).sort((a, b) => b - a);

  /**
   * @rule {fn-order-processing}
   * Extract unique transmission types
   */
  const cambios = Array.from(
    new Set(vehicles.map((v) => v.cambio).filter((c) => c !== undefined))
  ) as string[];

  /**
   * @rule {fn-order-processing}
   * Group models by brand
   */
  const modelosPorMarca: { [marca: string]: string[] } = {};
  vehicles.forEach((v) => {
    if (!modelosPorMarca[v.marca]) {
      modelosPorMarca[v.marca] = [];
    }
    if (!modelosPorMarca[v.marca].includes(v.modelo)) {
      modelosPorMarca[v.marca].push(v.modelo);
    }
  });

  Object.keys(modelosPorMarca).forEach((marca) => {
    modelosPorMarca[marca].sort();
  });

  return {
    marcas,
    modelos,
    anos,
    cambios,
    modelosPorMarca,
  };
}

/**
 * @summary
 * Gets detailed information for a specific vehicle
 *
 * @function vehicleGet
 * @param {string} idVeiculo - Vehicle identifier
 * @returns {Promise<VehicleDetail | null>} Vehicle detail or null if not found
 */
export async function vehicleGet(idVeiculo: string): Promise<VehicleDetail | null> {
  /**
   * @rule {fn-order-processing}
   * Retrieve vehicle detail from in-memory storage
   */
  const detail = vehicleDetails.get(idVeiculo);

  if (!detail) {
    return null;
  }

  /**
   * @rule {fn-order-processing}
   * Generate similar vehicles based on brand and price range
   */
  const priceRange = detail.preco * 0.2;
  const similarVehicles = vehicles
    .filter(
      (v) =>
        v.idVeiculo !== idVeiculo &&
        (v.marca === detail.marca ||
          (v.preco >= detail.preco - priceRange && v.preco <= detail.preco + priceRange))
    )
    .slice(0, 6);

  return {
    ...detail,
    veiculosSimilares: similarVehicles,
    criteriosSimilaridade: ['Marca', 'Preço'],
    formatoExibicao: 'carrossel',
    informacoesCard: ['foto', 'marca', 'modelo', 'ano', 'preco', 'quilometragem'],
  };
}
