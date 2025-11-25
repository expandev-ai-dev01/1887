import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { contactSchema } from '../../validations/contact';
import type { ContactFormInput, ContactFormOutput } from '../../types';
import type { ContactFormProps } from './types';
import { useContactSubmit } from '../../hooks';
import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import { Checkbox } from '@/core/components/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import { Separator } from '@/core/components/separator';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

function ContactForm({ vehicleId, vehicleModel, onSuccess }: ContactFormProps) {
  const { submit, isSubmitting, isSuccess, reset } = useContactSubmit();
  const [protocolo, setProtocolo] = useState<string>('');
  const [charCount, setCharCount] = useState(0);

  const form = useForm<ContactFormInput, any, ContactFormOutput>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefone: '',
      preferenciaContato: 'E-mail',
      melhorHorario: 'Qualquer horário',
      idVeiculo: vehicleId,
      modeloVeiculo: vehicleModel,
      assunto: 'Informações gerais',
      mensagem: '',
      financiamento: false,
      termosPrivacidade: false,
      receberNovidades: false,
    },
  });

  const watchAssunto = form.watch('assunto');
  const watchMensagem = form.watch('mensagem');

  useEffect(() => {
    if (watchAssunto === 'Financiamento') {
      form.setValue('financiamento', true);
    }
  }, [watchAssunto, form]);

  useEffect(() => {
    setCharCount(watchMensagem?.length ?? 0);
  }, [watchMensagem]);

  const onSubmit = async (data: ContactFormOutput) => {
    try {
      const sanitizedData = {
        ...data,
        mensagem: DOMPurify.sanitize(data.mensagem),
      };

      const response = await submit(sanitizedData);
      setProtocolo(response.protocolo);
      toast.success('Contato enviado com sucesso!', {
        description: `Protocolo: ${response.protocolo}`,
      });
      onSuccess?.(response.protocolo);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ??
        'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.';
      toast.error('Erro ao enviar contato', {
        description: errorMessage,
      });
    }
  };

  const handleReset = () => {
    form.reset();
    reset();
    setProtocolo('');
  };

  if (isSuccess && protocolo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="text-primary h-6 w-6" />
            Contato Enviado com Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Protocolo: {protocolo}</AlertTitle>
            <AlertDescription>
              Agradecemos seu contato! Recebemos sua mensagem e entraremos em contato em até 24
              horas úteis através do meio de comunicação selecionado.
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              Um e-mail de confirmação foi enviado para o endereço informado com os detalhes da sua
              consulta.
            </p>
            <p className="text-muted-foreground text-sm">
              Guarde o número do protocolo para acompanhamento.
            </p>
          </div>
          <Button onClick={handleReset} variant="outline" className="w-full">
            Enviar Novo Contato
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulário de Contato</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Dados Pessoais</h3>

              <FormField
                control={form.control}
                name="nomeCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo *</FormLabel>
                    <FormControl>
                      <Input placeholder="João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="joao@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(11) 98765-4321"
                        {...field}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length > 11) value = value.slice(0, 11);
                          if (value.length > 6) {
                            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                          } else if (value.length > 2) {
                            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                          }
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferenciaContato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferência de Contato *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Telefone">Telefone</SelectItem>
                        <SelectItem value="E-mail">E-mail</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="melhorHorario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Melhor Horário para Contato</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Manhã">Manhã</SelectItem>
                        <SelectItem value="Tarde">Tarde</SelectItem>
                        <SelectItem value="Noite">Noite</SelectItem>
                        <SelectItem value="Qualquer horário">Qualquer horário</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações sobre o Veículo</h3>

              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm font-medium">Veículo de Interesse:</p>
                <p className="text-base font-semibold">{vehicleModel}</p>
              </div>

              <FormField
                control={form.control}
                name="assunto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Informações gerais">Informações gerais</SelectItem>
                        <SelectItem value="Agendamento de test drive">
                          Agendamento de test drive
                        </SelectItem>
                        <SelectItem value="Negociação de preço">Negociação de preço</SelectItem>
                        <SelectItem value="Financiamento">Financiamento</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva sua consulta sobre o veículo..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{charCount}/1000 caracteres</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="financiamento"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Tenho interesse em opções de financiamento</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="termosPrivacidade"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={(checked) => field.onChange(checked === true)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Li e concordo com os{' '}
                        <a href="#" className="text-primary underline">
                          termos de privacidade
                        </a>{' '}
                        *
                      </FormLabel>
                      <FormDescription>
                        Seus dados serão utilizados apenas para contato sobre este veículo e
                        armazenados conforme a LGPD.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receberNovidades"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Desejo receber novidades e promoções por e-mail</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Contato
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export { ContactForm };
