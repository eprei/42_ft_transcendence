import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseLoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      console.log('Response Headers:', res.getHeaders());
      console.log('Response Cookies:', res.getHeader('Set-Cookie'));
    });

    next();
  }
}
