import { Request, Response } from 'express';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

export default class UserAvatarController {
	public async update(req: Request, res: Response): Promise<Response> {
		const updateAvatar = new UpdateUserAvatarService()

		const user = await updateAvatar.execute({
			user_id: req.user.id,
			avatarFilename: req.file?.filename,
		})

		return res.json(user)
	}
}
