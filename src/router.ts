import express, { Request, Response } from 'express';
import DAO from './dao';
import { Product } from './model/Product';

const router = express.Router();
const dao: DAO = new DAO();

router.get('/', function(req: Request, res: Response) {
  let products: Product[] = dao.listProducts(); 
  if (req.query.search == undefined) {
    res.render(__dirname + '/pages/index.ejs', { products });  
  } else {
    let query: string = String(req.query.search).toLowerCase();
    let queryProducts: Product[] = [];
    for (let product of products) {
      if (product.name.toLowerCase().includes(query)) {
        queryProducts.push(product);
      }
    }
    res.render(__dirname + '/pages/index.ejs', { products: queryProducts });  
  }  
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

router.post('/products/price-change', function (req: Request, res: Response) {  
  let products: Product[] = dao.listProducts(); 
  for (let product of products) {
    let price = product.price;
    product.price = price + price * req.body.percentage / 100;
    dao.updateProduct(product);
  }  
  res.redirect('/');
});

router.post('/products/delete', function (req: Request, res: Response) {  
  let product: Product = JSON.parse(req.body.product);
  dao.deleteProduct(product.id);
  res.redirect('/');
});

export default router;