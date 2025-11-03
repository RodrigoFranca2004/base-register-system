import { z } from 'zod';

export const createClientSchema = z.object({
  body: z.object({
    
    name: z.string()
      .min(3, { message: 'Name must be at least 3 characters long.' }),
    
    email: z.string()
      .min(1, { message: 'Email is required.' }) // Garante que não é vazio
      .email({ message: 'Invalid email format.' }), // Valida o formato
    
    phone: z.string().optional(),
  }),
});

export const updateClientSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .optional(), 
    email: z.string()
      .email({ message: 'Invalid email format.' })
      .optional(),
    
    phone: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid({ message: 'Invalid client ID format (must be a UUID).' }),
  }),
});

export const clientIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Invalid client ID format (must be a UUID).' }),
  }),
});