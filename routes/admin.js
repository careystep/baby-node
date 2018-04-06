import express from 'express';
import admin from '../controller/admin/admin'
const Router = express.Router();

Router.post('/login', admin.login);
Router.post('/logout', admin.logout);
Router.post('/adminList', admin.adminList);
Router.post('/info', admin.getAdminInfo);


export default Router;