import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	id: string;
	name: string;
}

class ShowUserService {
	public async execute({ id, name }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UserRepository);
		const product = await usersRepository.findOne(id);

		if (!product) {
			throw new AppError('Product not found');
		}

		const productExists = await usersRepository.findByName();

		if (productExists) {
			throw new AppError('There is already one product with this name');
		}

		product.name = name;

		await usersRepository.save(product);

		return product;
	}
}

export default ShowUserService;
