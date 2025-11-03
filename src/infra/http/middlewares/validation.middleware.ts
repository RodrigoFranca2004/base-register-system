import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Middleware para validar requisições usando um schema Zod.
 * @param schema O schema Zod para validar a requisição.
 */
export const validate = (schema: ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida o request (body, params, query) contra o schema
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      
      // Se for válido, continua para o controller
      next();

    } catch (error) {
      // Se for um erro de validação do Zod
      if (error instanceof ZodError) {
        
        // CORREÇÃO: A propriedade se chama '.issues' na v3 (não '.errors')
        const formattedErrors = error.issues.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        
        // Retorna 400 Bad Request com os detalhes do erro
        return res.status(400).json({
          message: 'Input validation failed.',
          errors: formattedErrors,
        });
      }
      
      // Se for outro tipo de erro
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };