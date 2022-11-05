export class BaseError extends Error {
    constructor(
        public readonly code: number,
        public readonly message: string,
        public readonly field?: string
    ) {
        super(message);
    }
  }
  
export class SchemaValidationError {
    constructor(
        public readonly code: string, 
        public readonly messages: string[], 
        public readonly field: string
    ){}
}

export class CrudException extends BaseError {}
export class NotFoundException extends BaseError {}
export class BadRequestException extends BaseError {}