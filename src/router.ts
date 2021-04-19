import express, { Request, Response } from 'express';
import DAO from './dao';
import { Product } from './model/Product';

const router = express.Router();
const dao: DAO = new DAO();

router.get('/', function(req: Request, res: Response) {
  let products: Product[] = dao.listProducts(); 
  res.render(__dirname + '/pages/index.ejs', { products });  
});

router.get('/create', function(req: Request, res: Response) {  
  res.render(__dirname + '/pages/create.ejs');  
});

router.get('/update', function(req: Request, res: Response) {  
  let product: Product = JSON.parse(String(req.query.product));
  res.render(__dirname + '/pages/update.ejs', { product });  
});

router.post('/products/create', function (req: Request, res: Response) {          
  let product: Product = new Product(req.body.id, req.body.name, parseFloat(req.body.price.replace(',','.')));
  dao.createProduct(product);
  res.redirect('/create');
});

router.post('/products/update', function (req: Request, res: Response) {  
  let product: Product = new Product(req.body.id, req.body.name, parseFloat(req.body.price.replace(',','.')));
  dao.updateProduct(product);
  res.redirect('/');
});

router.post('/products/delete', function (req: Request, res: Response) {  
  let product: Product = JSON.parse(req.body.product);
  dao.deleteProduct(product.id);
  res.redirect('/');
});

export { router };