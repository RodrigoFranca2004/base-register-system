import { z } from 'zod';

// Schema para criação (POST)
export const createClientSchema = z.object({
  body: z.object({
    
    // CORREÇÃO: z.string() é obrigatório por padrão.
    // Usamos .min() para garantir que não é uma string vazia.
    name: z.string()
      .min(3, { message: 'Name must be at least 3 characters long.' }),
    
    // CORREÇÃO: Adicionamos .min(1) para a mensagem de "required"
    email: z.string()
      .min(1, { message: 'Email is required.' }) // Garante que não é vazio
      .email({ message: 'Invalid email format.' }), // Valida o formato
    
    phone: z.string().optional(),
  }),
});

// Schema para atualização (PUT)
export const updateClientSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .optional(), // .optional() torna o campo opcional
    
    email: z.string()
      .email({ message: 'Invalid email format.' })
      .optional(),
    
    phone: z.string().optional(),
  }),
  params: z.object({
    // .uuid() está correto e não-depreciado quando usado assim
    id: z.string().uuid({ message: 'Invalid client ID format (must be a UUID).' }),
  }),
});

// Schema para GET por ID e DELETE
export const clientIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Invalid client ID format (must be a UUID).' }),
  }),
});