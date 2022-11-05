import 'reflect-metadata';

import Container, { Service } from 'typedi';
import express, {
    NextFunction,
    Request,
    Response,
} from 'express';

interface RouteDefinition {
    path: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    name: string;
    middleware: ExpressMiddleware[];
  }

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => any;

export default (app: express.Express, controllers: any, BASE_PATH: string) => {
  let controllerInstances = Object.values(controllers).map(controller =>
    Container.get(controller),
  );
  controllerInstances.forEach(instance =>
    registerControllerRoutes(instance as any, app, BASE_PATH),
  );
};

/**
 * Register controllers and routes on express server
 * @param controller Controller to inject routes
 * @param app Express application
 * @param BASE_PATH Base path application
 */
const registerControllerRoutes = (controller: new () => any, app: express.Express, BASE_PATH: string) => {
  let instance = controller.constructor;
  let prefix = Reflect.getMetadata('prefix', instance);
  let rootMiddlewares = Reflect.getMetadata('middlewares', instance);
  let routes: Array<RouteDefinition> = Reflect.getMetadata(
    'routes',
    instance,
  );

  routes.forEach(route => {
    let controllerMiddlewares = rootMiddlewares || [];
    let routeMiddlewares = route.middleware || [];
    let completePath = (BASE_PATH + prefix + route.path).replace(/\/{2,}/g, '/');
    
    app[route.method](
      completePath,
      [...controllerMiddlewares, ...routeMiddlewares],
      controller[route.name].bind(controller)
    );

    console.log(
      '\x1b[33m%s\x1b[0m',
      `Registered controller method ${instance.name}.${route.name} 
      at route [${route.method.toUpperCase()}]${completePath}`,
    );
  });
}

/**
 * Mapping HTTP verbs and path from anotations
 * @param method Method verb
 * @param path Path to listem
 * @param middleware Middleware to intercept requests
 * @returns MethodDecorator
 */
const mapping = (
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  path: string,
  middleware: ExpressMiddleware[],
): MethodDecorator => {
  return (target: any, propertyKey: any) => {

    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      'routes',
      target.constructor,
    ) as Array<RouteDefinition>

    routes.push({
      method,
      path,
      name: propertyKey,
      middleware
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

/**
 * Controller
 * @param prefix Prefix path
 * @param middlewares Middleware on intercept
 * @returns class
 */
export const Controller = (
    prefix = '',
    ...middlewares: ExpressMiddleware[]
  ): ClassDecorator => {
    return (target: any) => {
      Service()(target);
  
      Reflect.defineMetadata('prefix', prefix, target);
      Reflect.defineMetadata('middlewares', middlewares, target);
  
      if (!Reflect.hasMetadata('routes', target)) {
        Reflect.defineMetadata('routes', [], target);
      }
    };
  };
  


/**
 * Verb Get 
 * @param path Path to looking for
 * @param middleware Middleware on intercept
 * @returns MethodDecorator
 */
export const Get = (
  path: string,
  ...middleware: ExpressMiddleware[]
): MethodDecorator => {
  return mapping('get', path, middleware);
};

/**
 * Verb Put 
 * @param path Path to looking for
 * @param middleware Middleware on intercept
 * @returns MethodDecorator
 */
export const Put = (
  path: string,
  ...middleware: ExpressMiddleware[]
): MethodDecorator => {
  return mapping('put', path, middleware);
};

/**
 * Verb Post 
 * @param path Path to looking for
 * @param middleware Middleware on intercept
 * @returns MethodDecorator
 */
export const Post = (
  path: string,
  ...middleware: ExpressMiddleware[]
): MethodDecorator => {
  return mapping('post', path, middleware);
};

/**
 * Verb Patch 
 * @param path Path to looking for
 * @param middleware Middleware on intercept
 * @returns MethodDecorator
 */
export const Patch = (
  path: string,
  ...middleware: ExpressMiddleware[]
): MethodDecorator => {
  return mapping('patch', path, middleware);
};

/**
 * Verb Delete 
 * @param path Path to looking for
 * @param middleware Middleware on intercept
 * @returns MethodDecorator
 */
export const Delete = (
  path: string,
  ...middleware: ExpressMiddleware[]
): MethodDecorator => {
  return mapping('delete', path, middleware);
};

