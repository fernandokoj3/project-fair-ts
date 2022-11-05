import { NextFunction, Request, Response } from 'express';
import { Class } from 'utility-types';
import { validateObject } from './schema.validation';

function getValidatorMiddleware<T>(
  reqProperty: `body` | `query` | `params`,
  validationClass: Class<T>,
) {
  return async (req: Request, response: Response , next: NextFunction) => {
    // Valida campos do objeto e obtém objeto de erro caso contenha
    let { error, data } = await validateObject<T>(req[reqProperty], validationClass);
    if (error) {
      return response.status(400).send(error);
    }
    if (data) {
      req[reqProperty] = data
    }
    next()
  };
}

export function getBodyValidator<T>(validationClass: Class<T>) {
  return getValidatorMiddleware<T>(`body`, validationClass);
}

export function getQueryValidator<T>(validationClass: Class<T>) {
  return getValidatorMiddleware<T>(`query`, validationClass);
}

export function getUrlParamValidator<T>(validationClass: Class<T>) {
  return getValidatorMiddleware<T>(`params`, validationClass);
}