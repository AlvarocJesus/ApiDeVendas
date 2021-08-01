import { Router } from 'express';
import productsRoutes from '@modules/products/routes/products.routes';
import userRoutes from '@modules/users/routes/users.routes';
import sessionRoutes from '@modules/users/routes/session.routes';

const routes = Router();

routes.use('/products', productsRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);

export { routes };
