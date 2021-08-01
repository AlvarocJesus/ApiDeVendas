import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionsController';

const sessionRoutes = Router();

const sessionsController = new SessionController();

sessionRoutes.post(
	'/',
	celebrate({
		[Segments.BODY]: {
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		},
	}),
	sessionsController.create,
);

export default sessionRoutes;
