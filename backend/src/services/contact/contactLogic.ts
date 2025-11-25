/**
 * @summary
 * Contact business logic for form submission and storage.
 * Implements in-memory data storage for contact inquiries.
 *
 * @module services/contact/contactLogic
 */

import { ContactCreateParams, ContactCreateResponse, Contact } from './contactTypes';

/**
 * @rule {be-database-requirement}
 * In-memory contact storage (no database persistence)
 */
const contacts: Contact[] = [];

/**
 * @rule {be-database-requirement}
 * Rate limiting tracking (in-memory)
 */
const rateLimitTracker: Map<string, { count: number; firstAttempt: number }> = new Map();

/**
 * @summary
 * Generates a unique protocol number for contact tracking
 *
 * @function generateProtocol
 * @returns {string} Protocol number in format YYYYMMDDNNNNN
 */
function generateProtocol(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const sequence = String(contacts.length + 1).padStart(5, '0');
  return `${year}${month}${day}${sequence}`;
}

/**
 * @summary
 * Checks rate limiting for contact submissions
 *
 * @function checkRateLimit
 * @param {string} ipUsuario - User IP address
 * @throws {Error} If rate limit exceeded
 */
function checkRateLimit(ipUsuario: string): void {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxAttempts = 3;

  const tracker = rateLimitTracker.get(ipUsuario);

  if (!tracker) {
    rateLimitTracker.set(ipUsuario, { count: 1, firstAttempt: now });
    return;
  }

  /**
   * @rule {fn-order-processing}
   * Reset counter if window expired
   */
  if (now - tracker.firstAttempt > windowMs) {
    rateLimitTracker.set(ipUsuario, { count: 1, firstAttempt: now });
    return;
  }

  /**
   * @rule {fn-order-processing}
   * Check if limit exceeded
   */
  if (tracker.count >= maxAttempts) {
    const error: any = new Error('Rate limit exceeded');
    error.code = 'RATE_LIMIT_EXCEEDED';
    throw error;
  }

  tracker.count += 1;
}

/**
 * @summary
 * Creates a new contact inquiry
 *
 * @function contactCreate
 * @param {ContactCreateParams} params - Contact creation parameters
 * @returns {Promise<ContactCreateResponse>} Created contact with protocol number
 */
export async function contactCreate(params: ContactCreateParams): Promise<ContactCreateResponse> {
  /**
   * @validation Check rate limiting
   */
  checkRateLimit(params.ipUsuario);

  /**
   * @rule {fn-order-processing}
   * Generate protocol number
   */
  const numeroProtocolo = generateProtocol();

  /**
   * @rule {fn-order-processing}
   * Create contact record
   */
  const contact: Contact = {
    idContato: numeroProtocolo,
    numeroProtocolo,
    nomeCompleto: params.nomeCompleto,
    email: params.email,
    telefone: params.telefone,
    preferenciaContato: params.preferenciaContato,
    melhorHorario: params.melhorHorario || 'Qualquer horário',
    idVeiculo: params.idVeiculo,
    modeloVeiculo: params.modeloVeiculo,
    assunto: params.assunto,
    mensagem: params.mensagem,
    financiamento: params.financiamento || false,
    receberNovidades: params.receberNovidades || false,
    dataEnvio: new Date().toISOString(),
    ipUsuario: params.ipUsuario,
    status: 'Novo',
    dataUltimaAtualizacao: new Date().toISOString(),
  };

  /**
   * @rule {fn-order-processing}
   * Store contact in memory
   */
  contacts.push(contact);

  /**
   * @rule {fn-order-processing}
   * Simulate email sending (in real implementation, this would call email service)
   */
  console.log('Email de confirmação enviado para:', params.email);
  console.log('Email de notificação enviado para equipe de vendas');

  /**
   * @rule {fn-order-processing}
   * Return success response with protocol
   */
  return {
    numeroProtocolo,
    mensagemConfirmacao: `Obrigado pelo seu contato! Recebemos sua mensagem sobre o ${
      params.modeloVeiculo
    }. Seu número de protocolo é ${numeroProtocolo}. Nossa equipe entrará em contato em até 24 horas úteis através do ${params.preferenciaContato.toLowerCase()}.`,
    prazoResposta: '24 horas úteis',
    emailConfirmacaoEnviado: true,
  };
}

/**
 * @summary
 * Gets all contacts (for admin/consultant access)
 *
 * @function contactList
 * @returns {Promise<Contact[]>} List of all contacts
 */
export async function contactList(): Promise<Contact[]> {
  return contacts;
}

/**
 * @summary
 * Gets a specific contact by ID
 *
 * @function contactGet
 * @param {string} idContato - Contact identifier
 * @returns {Promise<Contact | null>} Contact or null if not found
 */
export async function contactGet(idContato: string): Promise<Contact | null> {
  return contacts.find((c) => c.idContato === idContato) || null;
}
