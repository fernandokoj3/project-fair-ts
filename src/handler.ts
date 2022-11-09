import 'reflect-metadata';

import 'express-async-errors'
import express, { Express } from 'express';
import { injectConnection } from '@/database/data-source';
import router from '@/utils/injectUtils';
import { BASE_PATH } from '@/utils/constants'
import controllers from '@/controllers';
import { exceptionHandlerMiddleware } from '@/middlewares/exception.handler';
import { serve, setup } from "swagger-ui-express";

import document from "./api-docs.json";

const doc = async (app: Express) => {
  app.use('/api-docs', serve, setup(document));
} 

boostrap().then(app => {
  app.listen(3000, () => console.log("Listening at localhost:3000"));
})

export async function boostrap(): Promise<Express> {
  const app = express();
  app.use(express.json());
  
  await doc(app);
  await injectConnection();

  router(app, controllers, BASE_PATH);

  app.use(exceptionHandlerMiddleware);

  return app;
}


