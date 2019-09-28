import { Request, Response } from 'express';
import { HTTP } from './responses/http';

export class UserController {
  public static create(req: Request, res: Response) {
    return HTTP.empty(res);
  }

  public static read(req: Request, res: Response): Response {
    return HTTP.empty(res);
  }

  public static update(req: Request, res: Response): Response {
    return HTTP.empty(res);
  }
}
