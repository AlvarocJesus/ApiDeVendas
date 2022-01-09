import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: User;
	token: string;
}

class CreateSessionService {
	public async execute({ email, password }: IRequest): Promise<IResponse> {
		const usersRepository = getCustomRepository(UserRepository);
		const user = await usersRepository.findByEmail(email);

		if (!user) {
			throw new AppError('Incorrect email/password combination', 401);
		}

		const passwordConfirmed = await compare(password, user.password);

		if (!passwordConfirmed) {
			throw new AppError('Incorrect email/password combination', 401);
		}

		const token = sign({}, auth.jwt.secret, {
			subject: user.id,
			expiresIn: auth.jwt.expiresIn,
		});

		return { user, token };
	}
}

export default CreateSessionService;
