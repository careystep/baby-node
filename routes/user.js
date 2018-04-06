import express from 'express';
const Router =  express.Router();
import user from '../controller/user/user'

Router.post('/login',user.login);
Router.post('/register',user.register);
Router.post('/getUserInfo',user.getUserInfo);
Router.post('/getUserList',user.getUserList);
Router.post('/updateAvatar',user.updateAvatar);
Router.post('/updateUserInfo',user.updateUserInfo);
Router.post('/insertbaby',user.insertbaby);
Router.post('/getBabyList',user.getBabyList);
Router.post('/likeToBaby',user.likeToBaby);
Router.post('/addComment',user.addComment);
Router.post('/getComments',user.getComments);
Router.post('/insertAddress',user.insertAddress);
Router.post('/deleteAddress',user.deleteAddress);
Router.post('/getAddress',user.getAddress);
Router.post('/updateAddress',user.updateAddress);
Router.post('/signout',user.signout);

export default Router;