import { publicClient } from '@/core/lib/api';
import type { ContactFormOutput, ContactSubmitResponse } from '../types';

/**
 * @service Contact Service
 * @domain contact
 * @type REST API Integration
 */
export const contactService = {
  /**
   * Submits contact form for vehicle inquiry
   */
  async submit(data: ContactFormOutput): Promise<ContactSubmitResponse> {
    const { data: response } = await publicClient.post<{ data: ContactSubmitResponse }>(
      '/contact',
      data
    );
    return response.data;
  },
};
