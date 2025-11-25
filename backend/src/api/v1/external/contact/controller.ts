/**
 * @summary
 * Contact form submission controller for vehicle inquiries.
 * Handles contact form data collection, validation, and storage.
 *
 * @module api/v1/external/contact/controller
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { contactCreate } from '@/services/contact';

/**
 * @validation Contact form submission parameters
 */
const contactSchema = z.object({
  nomeCompleto: z
    .string()
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(100, 'O nome deve conter no máximo 100 caracteres')
    .refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      'Por favor, informe seu nome completo (nome e sobrenome)'
    ),
  email: z
    .string()
    .email('Por favor, informe um endereço de e-mail válido no formato usuario@dominio.com')
    .max(100, 'O e-mail deve conter no máximo 100 caracteres')
    .refine(
      (val) => val.includes('.') && val.split('@')[1]?.includes('.'),
      'Deve conter um domínio válido com pelo menos um ponto'
    ),
  telefone: z
    .string()
    .min(10, 'O telefone deve conter pelo menos 10 dígitos incluindo DDD')
    .regex(
      /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
      'Por favor, informe um número de telefone válido com DDD'
    ),
  preferenciaContato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
    errorMap: () => ({ message: 'Por favor, selecione sua preferência de contato' }),
  }),
  melhorHorario: z
    .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
    .optional()
    .default('Qualquer horário'),
  idVeiculo: z.string().min(1, 'ID do veículo é obrigatório'),
  modeloVeiculo: z.string().min(1, 'Modelo do veículo é obrigatório'),
  assunto: z.enum(
    [
      'Informações gerais',
      'Agendamento de test drive',
      'Negociação de preço',
      'Financiamento',
      'Outro',
    ],
    {
      errorMap: () => ({ message: 'Por favor, selecione o assunto da sua consulta' }),
    }
  ),
  mensagem: z
    .string()
    .min(10, 'Por favor, forneça mais detalhes em sua mensagem (mínimo 10 caracteres)')
    .max(1000, 'Sua mensagem excedeu o limite de 1000 caracteres'),
  financiamento: z.boolean().optional().default(false),
  termosPrivacidade: z.literal(true, {
    errorMap: () => ({
      message: 'É necessário concordar com os termos de privacidade para prosseguir',
    }),
  }),
  receberNovidades: z.boolean().optional().default(false),
});

/**
 * @summary
 * Handles contact form submission
 *
 * @function postHandler
 * @module api/v1/external/contact/controller
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @returns {Promise<void>}
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Parse and validate contact form data
     */
    const data = contactSchema.parse(req.body);

    /**
     * @rule {fn-order-processing}
     * Auto-mark financiamento as true if assunto is 'Financiamento'
     */
    if (data.assunto === 'Financiamento') {
      data.financiamento = true;
    }

    /**
     * @rule {fn-order-processing}
     * Get client IP address for security tracking
     */
    const ipUsuario =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown';

    /**
     * @rule {fn-order-processing}
     * Execute contact creation
     */
    const result = await contactCreate({
      ...data,
      ipUsuario,
    });

    res.status(201).json(
      successResponse(result, {
        message: 'Contato enviado com sucesso',
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(400)
        .json(
          errorResponse(
            'Por favor, preencha todos os campos obrigatórios marcados com *',
            'VALIDATION_ERROR',
            error.errors
          )
        );
    } else if (error.code === 'RATE_LIMIT_EXCEEDED') {
      res
        .status(429)
        .json(
          errorResponse(
            'Detectamos múltiplas tentativas de envio. Por favor, aguarde alguns minutos antes de tentar novamente',
            'RATE_LIMIT_EXCEEDED'
          )
        );
    } else {
      next(error);
    }
  }
}
