import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * @param schema O schema Zod para validar a requisição.
 */
export const validate = (schema: ZodSchema) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      
      next();

    } catch (error) {
      if (error instanceof ZodError) {
        
        const formattedErrors = error.issues.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        
        return res.status(400).json({
          message: 'Input validation failed.',
          errors: formattedErrors,
        });
      }
      
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };