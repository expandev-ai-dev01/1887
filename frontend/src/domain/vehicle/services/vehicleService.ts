import { authenticatedClient } from '@/core/lib/api';
import type {
  VehicleListParams,
  VehicleListResponse,
  FilterOptions,
  VehicleDetail,
} from '../types';

/**
 * @service Vehicle Service
 * @domain vehicle
 * @type REST API Integration
 */
export const vehicleService = {
  /**
   * Lists vehicles with filtering, sorting, and pagination
   */
  async list(params?: VehicleListParams): Promise<VehicleListResponse> {
    const { data } = await authenticatedClient.get<{ data: VehicleListResponse }>('/vehicle', {
      params,
    });
    return data.data;
  },

  /**
   * Gets available filter options (brands, models, years, transmission types)
   */
  async getFilterOptions(): Promise<FilterOptions> {
    const { data } = await authenticatedClient.get<{ data: FilterOptions }>(
      '/vehicle/filter-options'
    );
    return data.data;
  },

  /**
   * Gets detailed information for a specific vehicle
   */
  async getById(id: string): Promise<VehicleDetail> {
    const { data } = await authenticatedClient.get<{ data: VehicleDetail }>(`/vehicle/${id}`);
    return data.data;
  },
};
