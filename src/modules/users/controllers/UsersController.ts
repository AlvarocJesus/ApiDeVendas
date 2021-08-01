import { Request, Response } from 'express';
import CreateUsersService from '../service/CreateUsersService';
import ListUsersService from '../service/ListUsersService';

export default class UsersController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listUser = new ListUsersService();
		const users = await listUser.execute();

		return res.json(users);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email, password } = req.body;

		const createUser = new CreateUsersService();
		const user = await createUser.execute({
			name,
			email,
			password
		});

		return res.json(user);
	}
}
