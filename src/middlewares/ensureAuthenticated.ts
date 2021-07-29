import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Receber o token
  const authToken = request.headers.authorization;

  //Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  //Validar se token é valido
  const [, token] = authToken.split(' ');

  try {
    //Recuperar informações do usuário
    const { sub } = verify(
      token,
      '1ab85721f324b7e7ee833bfb31babc79'
    ) as IPayload;
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
