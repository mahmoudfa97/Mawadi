import 'i18next';
import { TFunction } from 'i18next';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    t: TFunction;
  }
}
