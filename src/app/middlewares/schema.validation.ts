import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { SchemaValidationError } from "@/models/error.types";

export async function validateObject<T = any>(
    obj: any,
    validationClass: new () => T,
    options?: any,
  ): Promise<{ error?: SchemaValidationError[]; data?: T }> {
    // Transforms plain object into instance class
    let $obj: any = plainToClass(validationClass, Object.assign({}, obj));
  
    // Check for validation errors
    let errors = await validate($obj, validationClass, {
      ...options,
    });
  
    if (errors.length === 0) {
      return { data: $obj };
    }
  
    const classValidatorErrors: SchemaValidationError[] = [];
  
    errors.forEach(error => {
      const messages = [];
  
      let errorFields = Object.entries(
        error?.constraints ? error?.constraints : {},
      );
  
      let code: string;
      let fieldName: string;
      errorFields.forEach(field => {
        const constraintKey = field[0];
        const value = field[1];
  
        messages.push(value);
        code =
          error?.contexts?.[constraintKey]?.code ??
          '___GENERIC_SCHEMA_VALIDATION_ERROR_CODE_TO_BE_DEFINED';
        fieldName = error?.property;
      });
  
      classValidatorErrors.push(
        new SchemaValidationError(code, messages, fieldName),
      );
    });
  
    const error = classValidatorErrors;
  
    return { error };
  }