import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import fs from 'fs';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
	user_id: string;
	avatarFilename: string;
}

class UpdateUserAvatarService {
	public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
		const usersRepository = getCustomRepository(UserRepository);

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(upload.directory, user.avatar);
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath);
			}
		}

		user.avatar = avatarFilename;

		await usersRepository.save(user);

		return user;
	}
}

export default UpdateUserAvatarService;
