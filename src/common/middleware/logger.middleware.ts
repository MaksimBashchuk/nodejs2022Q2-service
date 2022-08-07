import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { method, url, body, params } = req;
      const { statusCode } = res;

      this.logger.log(
        `HTTP request:
      METHOD - ${method}
      URL - ${url}
      REQUEST BODY - ${JSON.stringify(body)}
      QUERY PARAMETERS - ${JSON.stringify(params)}
      RESPONSE STATUS CODE - ${statusCode}`,
      );
    });

    next();
  }
}
