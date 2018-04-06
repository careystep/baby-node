import express from 'express';
const Router =  express.Router();
import product from '../controller/shop/product'

Router.post('/insertProduct',product.insertProduct);
Router.post('/commentProduct',product.commentProduct);
Router.post('/getShopProduct',product.getShopProduct);


export default Router;