import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    //Verificar se email existe
    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }

    //verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }

    //Gerar token
    const token = sign(
      {
        email: user.email,
      },
      '1ab85721f324b7e7ee833bfb31babc79',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    //Retornar o token
    return token;
  }
}

export { AuthenticateUserService };
