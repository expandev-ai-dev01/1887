/**
 * @summary
 * Type definitions for vehicle service operations.
 * Defines interfaces for vehicle entities, list parameters, and responses.
 *
 * @module services/vehicle/vehicleTypes
 */

/**
 * @interface Vehicle
 * @description Represents a vehicle entity in the catalog
 *
 * @property {string} idVeiculo - Unique vehicle identifier
 * @property {string} modelo - Vehicle model name (max 50 characters)
 * @property {string} marca - Vehicle brand/manufacturer
 * @property {number} ano - Manufacturing year (YYYY format)
 * @property {number} preco - Vehicle price in Brazilian Reais
 * @property {string} imagemPrincipal - URL of main vehicle image (16:9 ratio, 300x169px)
 * @property {number} quilometragem - Current mileage (optional)
 * @property {string} cambio - Transmission type (optional)
 */
export interface Vehicle {
  idVeiculo: string;
  modelo: string;
  marca: string;
  ano: number;
  preco: number;
  imagemPrincipal: string;
  quilometragem?: number;
  cambio?: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático';
}

/**
 * @interface VehicleListParams
 * @description Parameters for vehicle listing with filters, sorting, and pagination
 *
 * @property {string[]} marca - Filter by brands (multiple selection)
 * @property {string[]} modelo - Filter by models (multiple selection)
 * @property {number} anoMin - Minimum year filter
 * @property {number} anoMax - Maximum year filter
 * @property {number} precoMin - Minimum price filter
 * @property {number} precoMax - Maximum price filter
 * @property {string[]} cambio - Filter by transmission types (multiple selection)
 * @property {string} ordenacao - Sorting criteria
 * @property {number} pagina - Current page number (min: 1)
 * @property {number} itensPorPagina - Items per page (12, 24, 36, or 48)
 */
export interface VehicleListParams {
  marca?: string[];
  modelo?: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambio?: ('Manual' | 'Automático' | 'CVT' | 'Semi-automático')[];
  ordenacao?:
    | 'Relevância'
    | 'Preço (menor para maior)'
    | 'Preço (maior para menor)'
    | 'Ano (mais recente)'
    | 'Ano (mais antigo)'
    | 'Modelo (A-Z)'
    | 'Modelo (Z-A)';
  pagina: number;
  itensPorPagina: number;
}

/**
 * @interface PaginationMetadata
 * @description Pagination information for vehicle list response
 *
 * @property {number} paginaAtual - Current page number
 * @property {number} itensPorPagina - Items per page
 * @property {number} totalPaginas - Total number of pages
 * @property {number} totalVeiculos - Total number of vehicles matching filters
 * @property {boolean} temProxima - Whether there is a next page
 * @property {boolean} temAnterior - Whether there is a previous page
 * @property {number} exibindoDe - Starting item number in current page
 * @property {number} exibindoAte - Ending item number in current page
 */
export interface PaginationMetadata {
  paginaAtual: number;
  itensPorPagina: number;
  totalPaginas: number;
  totalVeiculos: number;
  temProxima: boolean;
  temAnterior: boolean;
  exibindoDe: number;
  exibindoAte: number;
}

/**
 * @interface AppliedFilters
 * @description Currently applied filters for vehicle listing
 *
 * @property {string[]} marca - Applied brand filters
 * @property {string[]} modelo - Applied model filters
 * @property {number} anoMin - Applied minimum year filter
 * @property {number} anoMax - Applied maximum year filter
 * @property {number} precoMin - Applied minimum price filter
 * @property {number} precoMax - Applied maximum price filter
 * @property {string[]} cambio - Applied transmission type filters
 * @property {string} ordenacao - Applied sorting criteria
 */
export interface AppliedFilters {
  marca: string[];
  modelo: string[];
  anoMin?: number;
  anoMax?: number;
  precoMin?: number;
  precoMax?: number;
  cambio: string[];
  ordenacao: string;
}

/**
 * @interface VehicleListResponse
 * @description Response structure for vehicle listing
 *
 * @property {Vehicle[]} veiculos - Array of vehicles for current page
 * @property {PaginationMetadata} paginacao - Pagination metadata
 * @property {AppliedFilters} filtrosAplicados - Currently applied filters
 */
export interface VehicleListResponse {
  veiculos: Vehicle[];
  paginacao: PaginationMetadata;
  filtrosAplicados: AppliedFilters;
}

/**
 * @interface FilterOptions
 * @description Available filter options based on current inventory
 *
 * @property {string[]} marcas - Available brands
 * @property {string[]} modelos - Available models
 * @property {number[]} anos - Available years
 * @property {string[]} cambios - Available transmission types
 * @property {object} modelosPorMarca - Models grouped by brand
 */
export interface FilterOptions {
  marcas: string[];
  modelos: string[];
  anos: number[];
  cambios: string[];
  modelosPorMarca: { [marca: string]: string[] };
}

/**
 * @interface VehiclePhoto
 * @description Represents a vehicle photo in the gallery
 *
 * @property {string} url - Photo URL
 * @property {string} legenda - Photo caption (max 50 characters)
 * @property {boolean} principal - Whether this is the main photo
 */
export interface VehiclePhoto {
  url: string;
  legenda: string;
  principal: boolean;
}

/**
 * @interface VehicleItem
 * @description Represents a vehicle feature or optional item
 *
 * @property {string} nome - Item name
 * @property {string} categoria - Item category (Conforto, Segurança, Tecnologia, Performance, Estética)
 */
export interface VehicleItem {
  nome: string;
  categoria: 'Conforto' | 'Segurança' | 'Tecnologia' | 'Performance' | 'Estética';
}

/**
 * @interface VehicleRevision
 * @description Represents a vehicle maintenance revision
 *
 * @property {string} data - Revision date (ISO format)
 * @property {number} quilometragem - Mileage at revision
 * @property {string} local - Service location
 */
export interface VehicleRevision {
  data: string;
  quilometragem: number;
  local: string;
}

/**
 * @interface VehicleSinister
 * @description Represents a vehicle accident/sinister record
 *
 * @property {string} data - Sinister date (ISO format)
 * @property {string} tipo - Sinister type
 * @property {string} descricao - Sinister description
 */
export interface VehicleSinister {
  data: string;
  tipo: string;
  descricao: string;
}

/**
 * @interface VehicleTechnicalReport
 * @description Represents a vehicle technical inspection report
 *
 * @property {string} dataInspecao - Inspection date (ISO format)
 * @property {string} resultadoGeral - Overall result
 * @property {string} observacoes - Additional observations
 */
export interface VehicleTechnicalReport {
  dataInspecao: string;
  resultadoGeral: string;
  observacoes: string;
}

/**
 * @interface FinancingConditions
 * @description Represents financing conditions for a vehicle
 *
 * @property {number} entradaMinima - Minimum down payment
 * @property {number} taxaJuros - Interest rate (monthly percentage)
 * @property {number} prazoMaximo - Maximum financing term (months)
 */
export interface FinancingConditions {
  entradaMinima: number;
  taxaJuros: number;
  prazoMaximo: number;
}

/**
 * @interface DocumentationItem
 * @description Represents a required documentation item
 *
 * @property {string} documento - Document name
 * @property {string} observacao - Additional observations
 */
export interface DocumentationItem {
  documento: string;
  observacao: string;
}

/**
 * @interface DocumentalSituation
 * @description Represents the documental situation of a vehicle
 *
 * @property {string} status - Status (Regular, Pendente, Em andamento)
 * @property {string[]} pendencias - List of pending items
 * @property {string} observacoes - Additional observations
 */
export interface DocumentalSituation {
  status: 'Regular' | 'Pendente' | 'Em andamento';
  pendencias: string[];
  observacoes: string;
}

/**
 * @interface VehicleDetail
 * @description Represents detailed vehicle information
 *
 * @property {string} idVeiculo - Unique vehicle identifier
 * @property {string} tituloAnuncio - Ad title (max 100 characters)
 * @property {string} modelo - Vehicle model
 * @property {string} marca - Vehicle brand
 * @property {number} anoFabricacao - Manufacturing year
 * @property {number} anoModelo - Model year
 * @property {number} preco - Vehicle price
 * @property {string} statusVeiculo - Vehicle status (Disponível, Reservado, Vendido)
 * @property {number} quilometragem - Current mileage
 * @property {string} combustivel - Fuel type
 * @property {string} cambio - Transmission type
 * @property {string} potencia - Engine power
 * @property {string} cor - Vehicle color
 * @property {number} portas - Number of doors
 * @property {string} carroceria - Body type
 * @property {string} motor - Engine displacement
 * @property {number} finalPlaca - License plate final digit
 * @property {VehiclePhoto[]} fotos - Photo gallery
 * @property {string} modoAmpliacao - Photo zoom mode
 * @property {number} nivelZoom - Zoom level (100-300)
 * @property {VehicleItem[]} itensSerie - Standard features
 * @property {VehicleItem[]} opcionais - Optional features
 * @property {number} limiteItensVisivel - Visible items limit per category
 * @property {string} procedencia - Vehicle origin
 * @property {number} proprietarios - Number of previous owners
 * @property {string} garantia - Warranty information
 * @property {VehicleRevision[]} revisoes - Revision history
 * @property {VehicleSinister[]} sinistros - Sinister history
 * @property {VehicleTechnicalReport} laudoTecnico - Technical report
 * @property {string[]} formasPagamento - Payment methods
 * @property {FinancingConditions} condicoesFinanciamento - Financing conditions
 * @property {boolean} aceitaTroca - Accepts trade-in
 * @property {string} observacoesVenda - Sale observations
 * @property {DocumentationItem[]} documentacaoNecessaria - Required documentation
 * @property {DocumentalSituation} situacaoDocumental - Documental situation
 * @property {string} urlCompartilhamento - Sharing URL
 * @property {string[]} redesSociais - Available social networks
 * @property {string} textoCompartilhamento - Sharing text
 * @property {Vehicle[]} veiculosSimilares - Similar vehicles
 * @property {string[]} criteriosSimilaridade - Similarity criteria
 * @property {string} formatoExibicao - Display format (carrossel, grade, lista)
 * @property {string[]} informacoesCard - Card information fields
 */
export interface VehicleDetail {
  idVeiculo: string;
  tituloAnuncio: string;
  modelo: string;
  marca: string;
  anoFabricacao: number;
  anoModelo: number;
  preco: number;
  statusVeiculo: 'Disponível' | 'Reservado' | 'Vendido';
  quilometragem: number;
  combustivel: 'Gasolina' | 'Etanol' | 'Flex' | 'Diesel' | 'Elétrico' | 'Híbrido';
  cambio: 'Manual' | 'Automático' | 'CVT' | 'Semi-automático' | 'Automatizado';
  potencia: string;
  cor: string;
  portas: number;
  carroceria: 'Hatch' | 'Sedan' | 'SUV' | 'Picape' | 'Minivan' | 'Conversível' | 'Cupê' | 'Wagon';
  motor: string;
  finalPlaca: number;
  fotos: VehiclePhoto[];
  modoAmpliacao: 'lightbox' | 'zoom' | 'ambos';
  nivelZoom: number;
  itensSerie: VehicleItem[];
  opcionais: VehicleItem[];
  limiteItensVisivel: number;
  procedencia: 'Particular' | 'Concessionária' | 'Leilão' | 'Importado' | 'Locadora';
  proprietarios: number;
  garantia?: string;
  revisoes: VehicleRevision[];
  sinistros: VehicleSinister[];
  laudoTecnico?: VehicleTechnicalReport;
  formasPagamento: string[];
  condicoesFinanciamento?: FinancingConditions;
  aceitaTroca: boolean;
  observacoesVenda?: string;
  documentacaoNecessaria: DocumentationItem[];
  situacaoDocumental: DocumentalSituation;
  urlCompartilhamento: string;
  redesSociais: string[];
  textoCompartilhamento: string;
  veiculosSimilares?: Vehicle[];
  criteriosSimilaridade?: string[];
  formatoExibicao?: 'carrossel' | 'grade' | 'lista';
  informacoesCard?: string[];
}
