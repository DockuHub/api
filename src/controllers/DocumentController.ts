import { Request, Response } from "express";

import { HTTP } from "./responses/http";

export class DocumentController {
  /**
   * Create a document
   * @param req
   * @param res
   */
  public static async create(req: Request, res: Response): Promise<Response> {
    // TODO Setup pressgined URL flow
    // TODO This should return a pressigned URL
    return HTTP.empty(res);
  }

  /**
   * Get a document by Id
   * @param req
   * @param res
   */
  public static async getById(req: Request, res: Response): Promise<Response> {
    return HTTP.empty(res);
  }
}
