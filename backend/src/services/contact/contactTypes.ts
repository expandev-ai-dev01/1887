/**
 * @summary
 * Type definitions for contact service operations.
 * Defines interfaces for contact entities, creation parameters, and responses.
 *
 * @module services/contact/contactTypes
 */

/**
 * @interface ContactCreateParams
 * @description Parameters for creating a new contact inquiry
 *
 * @property {string} nomeCompleto - Full name (min 3, max 100 characters)
 * @property {string} email - Email address (max 100 characters)
 * @property {string} telefone - Phone number with area code
 * @property {string} preferenciaContato - Preferred contact method
 * @property {string} melhorHorario - Best time to contact (optional)
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model name
 * @property {string} assunto - Inquiry subject
 * @property {string} mensagem - Detailed message (min 10, max 1000 characters)
 * @property {boolean} financiamento - Interest in financing (optional)
 * @property {boolean} termosPrivacidade - Privacy terms acceptance
 * @property {boolean} receberNovidades - Newsletter subscription (optional)
 * @property {string} ipUsuario - User IP address
 */
export interface ContactCreateParams {
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: 'Telefone' | 'E-mail' | 'WhatsApp';
  melhorHorario?: 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';
  idVeiculo: string;
  modeloVeiculo: string;
  assunto:
    | 'Informações gerais'
    | 'Agendamento de test drive'
    | 'Negociação de preço'
    | 'Financiamento'
    | 'Outro';
  mensagem: string;
  financiamento?: boolean;
  termosPrivacidade: boolean;
  receberNovidades?: boolean;
  ipUsuario: string;
}

/**
 * @interface ContactCreateResponse
 * @description Response structure for contact creation
 *
 * @property {string} numeroProtocolo - Protocol number for tracking
 * @property {string} mensagemConfirmacao - Confirmation message
 * @property {string} prazoResposta - Expected response time
 * @property {boolean} emailConfirmacaoEnviado - Whether confirmation email was sent
 */
export interface ContactCreateResponse {
  numeroProtocolo: string;
  mensagemConfirmacao: string;
  prazoResposta: string;
  emailConfirmacaoEnviado: boolean;
}

/**
 * @interface Contact
 * @description Represents a contact inquiry entity
 *
 * @property {string} idContato - Unique contact identifier
 * @property {string} numeroProtocolo - Protocol number for tracking
 * @property {string} nomeCompleto - Full name
 * @property {string} email - Email address
 * @property {string} telefone - Phone number
 * @property {string} preferenciaContato - Preferred contact method
 * @property {string} melhorHorario - Best time to contact
 * @property {string} idVeiculo - Vehicle identifier
 * @property {string} modeloVeiculo - Vehicle model name
 * @property {string} assunto - Inquiry subject
 * @property {string} mensagem - Detailed message
 * @property {boolean} financiamento - Interest in financing
 * @property {boolean} receberNovidades - Newsletter subscription
 * @property {string} dataEnvio - Submission date (ISO format)
 * @property {string} ipUsuario - User IP address
 * @property {string} status - Contact status
 * @property {string} consultorResponsavel - Assigned consultant (optional)
 * @property {string} dataUltimaAtualizacao - Last update date (ISO format)
 * @property {string} notasAtendimento - Service notes (optional)
 */
export interface Contact {
  idContato: string;
  numeroProtocolo: string;
  nomeCompleto: string;
  email: string;
  telefone: string;
  preferenciaContato: 'Telefone' | 'E-mail' | 'WhatsApp';
  melhorHorario: 'Manhã' | 'Tarde' | 'Noite' | 'Qualquer horário';
  idVeiculo: string;
  modeloVeiculo: string;
  assunto:
    | 'Informações gerais'
    | 'Agendamento de test drive'
    | 'Negociação de preço'
    | 'Financiamento'
    | 'Outro';
  mensagem: string;
  financiamento: boolean;
  receberNovidades: boolean;
  dataEnvio: string;
  ipUsuario: string;
  status: 'Novo' | 'Em atendimento' | 'Concluído' | 'Cancelado';
  consultorResponsavel?: string;
  dataUltimaAtualizacao: string;
  notasAtendimento?: string;
}
