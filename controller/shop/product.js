import BaseComponent from '../../prototype/baseComponent'
import ProductModel from '../../models/shop/product'
import chalk from 'chalk';
import createResData from '../../util/createResData'
import formidable from 'formidable'

class Shop extends BaseComponent {
    constructor() {
        super();
        this.insertProduct = this.insertProduct.bind(this);
        this.commentProduct = this.commentProduct.bind(this);
        this.getShopProduct = this.getShopProduct.bind(this);

    }

    async insertProduct(req,res) {

        // const {name,description,image_paths} = req.body;
        const user_id = req.cookies.user_id;
        const files_arr = [];
        try {
            const form = formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                const {name,description,price,total} = fields;
                for(let i in files){
                    files_arr.push(files[i]);
                }
                const image_paths =  await this.getPaths(files_arr);
                const productModel = new ProductModel({user_id,name,description,image_paths,price,total});
                const product_doc = await productModel.save();
                res.json(createResData({data:product_doc}));
            })

        }catch(err) {
            res.json(createResData({code:1,msg:"上传商品错误"+err}));
        }

    }

    commentProduct() {

    }

    async getShopProduct(req,res) {
        const {limit = 20, offset = 0} = req.body;
        try {
            const products = await ProductModel.find({}).sort({created_at: -1}).limit(Number(limit)).skip(Number(offset));

            res.json(createResData({data:products}));

        }catch (err) {
            res.json(createResData({code:1,msg:"获取商品列表错误"+err}));
        }
    }

    getAdminInfo() {

    }

    adminList() {

    }


}


export default new Shop();