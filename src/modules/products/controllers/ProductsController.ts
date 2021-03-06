import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductsService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
	public async index(req: Request, res: Response): Promise<Response> {
		const listProducts = new ListProductService();

		const products = await listProducts.execute();

		return res.json(products);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const showProducts = new ShowProductService();

		const product = await showProducts.execute({ id });

		return res.json(product);
	}

	public async create(req: Request, res: Response): Promise<Response> {
		const { name, price, quantity } = req.body;
		const createProducts = new CreateProductService();

		const products = await createProducts.execute({ name, price, quantity });

		return res.json(products);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const { name, price, quantity } = req.body;

		const updateProducts = new UpdateProductService();

		const products = await updateProducts.execute({
			id,
			name,
			price,
			quantity,
		});

		return res.json(products);
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const deleteProducts = new DeleteProductService();

		const products = await deleteProducts.execute({ id });

		return res.json([]);
	}
}
