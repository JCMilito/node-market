import express from 'express';
import { DAO } from './DAO';
import { Product } from './model/Product';

const router = express.Router();
const dao: DAO = new DAO();

router.get('/', function(req: any, res: any) {
  let products: Product[] = dao.listProducts(); 
  res.render(__dirname + '/pages/index.ejs', { products });  
});

router.get('/create', function(req: any, res: any) {  
  res.render(__dirname + '/pages/create.ejs');  
});

router.get('/update', function(req: any, res: any) {  
  let id = JSON.parse(req.query.product).id;  
  let product: Product = dao.findProduct(id);
  res.render(__dirname + '/pages/update.ejs', { product });  
});

router.post('/products/create', function (req: any, res: any) {          
  let product: Product = new Product(req.body.id, req.body.name, parseFloat(req.body.price.replace(',','.')));
  dao.createProduct(product);
  res.redirect('/create');
});

router.post('/products/update', function (req: any, res: any) {  
  let product: Product = new Product(req.body.id, req.body.name, parseFloat(req.body.price.replace(',','.')));
  dao.updateProduct(product);
  res.redirect('/');
});

router.post('/products/delete', function (req: any, res: any) {  
  let product: Product = JSON.parse(req.body.product);
  dao.deleteProduct(product.id);
  res.redirect('/');
});

export { router };