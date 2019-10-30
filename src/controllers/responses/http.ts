import { Response } from "express";

enum HTTPStatusCode {
  success = 200,
  created = 201,
  empty = 204,
  bad = 400,
  unauthorized = 401
}

type HTTPPayload = {
  statusCode: number;
  data?: Object;
};

export class HTTP {
  /**
   *
   * Successful request
   *
   */
  public static success(res: Response, data?: object): Response {
    const payload: HTTPPayload = { statusCode: HTTPStatusCode.success };
    data && (payload.data = data);
    return res.status(HTTPStatusCode.success).send(payload);
  }

  /**
   *
   * Created request
   *
   */
  public static created(res: Response, data?: object): Response {
    const payload: HTTPPayload = { statusCode: HTTPStatusCode.success };
    data && (payload.data = data);
    return res.status(HTTPStatusCode.created).send(payload);
  }

  /**
   *
   * Empty request
   *
   */
  public static empty(res: Response): Response {
    return res.status(HTTPStatusCode.empty).send();
  }

  /**
   *
   * Bad request
   *
   */
  public static bad(res: Response, error_message: string): Response {
    const payload: HTTPPayload = {
      statusCode: HTTPStatusCode.bad,
      data: { msg: error_message }
    };
    return res.status(HTTPStatusCode.bad).send(payload);
  }

  /**
   *
   * Unauthorized request
   *
   */
  public static unauthorized(res: Response): Response {
    return res.status(HTTPStatusCode.unauthorized).send();
  }
}
