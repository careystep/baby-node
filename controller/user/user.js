import AddressComponent from '../../prototype/addressComponent'
import UserModel from '../../models/user/user'
import UserInfoModel from '../../models/user/userInfo'
import LikeModel from '../../models/user/like'
import BabyModel from '../../models/user/baby'
import CommentModel from '../../models/user/comments'
import AddressModel from '../../models/user/address'
import formidable from 'formidable'
import chalk from 'chalk';
import utils from 'utility';
import createResData from '../../util/createResData'
import dtime from 'time-formater'
const _filter = {'pwd':0,'__v':0}; //过滤查询出来的结果字段

class User extends AddressComponent {
    constructor() {
        super()
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.signout = this.signout.bind(this);
        this.insertbaby = this.insertbaby.bind(this);
        this.insertAddress = this.insertAddress.bind(this);
    }

    async insertAddress(req,res) {

        const user_id = req.cookies.user_id;
        const id = await this.getId('address_id');
        const {phone,phone_bk,name,province,city,county,address_detail,sex,is_user_default} = this.req.body;
        try {
            const addressModel = new AddressModel({user_id,id,phone,phone_bk,name,province,city,county,address_detail,
            sex, is_user_default})
            if(is_user_default) {
                await AddressModel.findOneAndUpdate({user_id,is_user_default:true},{$set: {is_user_default:false}})
            }
            const address_doc = await addressModel.save();
            res.json(createResData({data:address_doc}))
        }catch (err) {
            res.json(createResData({code:1,msg:'新增地址列表失败'+err}));
            console.log('新增地址列表失败'+err)
        }

    }

    async getAddress(req,res) {
        const user_id = req.cookies.user_id;
        try {
            const address_doc = await AddressModel.find({user_id});
            res.json(createResData({data:address_doc}));
        }catch(err) {
            res.json(createResData({code:1,msg:'获取地址列表失败'+err}))
            console.log('获取地址列表失败'+err)
        }
    }

    async updateAddress(req,res) {
        const user_id = req.cookies.user_id;
        const {id,phone,phone_bk,name,province,city,county,address_detail,sex,is_user_default} = this.req.body;
        try {
            if(is_user_default) {
                await AddressModel.findOneAndUpdate({user_id,is_user_default:true},{is_user_default:false})
            }
            const address_doc = await AddressModel.findOneAndUpdate({user_id,id}, {$set: {
                phone,phone_bk,name,province,city,county,address_detail,sex,is_user_default
            }})
            res.json(createResData({data:address_doc}))
        }catch(err) {
            res.json(createResData({code:1,msg:'更新地址列表失败'+err}))
        }

    }

    async deleteAddress(req,res) {

        const user_id = req.cookie.user_id;
        const id = req.body.id;
        try {
           const address_doc = await AddressModel.findOneAndRemove({user_id,id})
            res.json(createResData({data:address_doc}))
        }catch(err) {
            console.log('删除地址列表失败'+err)
        }


    }

    async getComments(req,res) {
        const {limit = 20, offset = 0,baby_id} = req.body;
        try {
            const comment_doc = await CommentModel.find({baby_id}).sort({created_at: -1}).limit(Number(limit)).skip(Number(offset));
            res.json(createResData({data:comment_doc}));
        }catch (err) {
            console.log('获取评论列表失败'+err);
        }
    }

    async addComment(req,res) {
        const user_id = req.cookies.user_id;
        const {content,baby_id} =  req.body;

        try {
            const user_doc = await UserInfoModel.findOne({user_id})
            const commentModel = new CommentModel({user_id,content,baby_id,avatar:user_doc.avatar,username:user_doc.username});
            const comment_doc = await commentModel.save();
            res.json(createResData({data:comment_doc}));
        }catch (err) {
            console.log('添加评论失败'+err);
        }
    }
    async likeToBaby(req,res) {
        const user_id = req.cookies.user_id;
        const baby_id = req.body.baby_id;

        try {

            const like_doc = await LikeModel.findOne({user_id,baby_id});

            const baby_doc = await BabyModel.findOne({_id:baby_id});
            const hot = like_doc ? --baby_doc.hot : ++baby_doc.hot;
            await BabyModel.findOneAndUpdate({_id:baby_id}, {$set: {hot}});
            if(like_doc){
                await LikeModel.findOneAndRemove({user_id,baby_id})
            }else{
                const likeModel = new LikeModel({user_id,baby_id});
                LikeModel.create(likeModel)
            }

            res.json(createResData({data:hot}));
        }catch (err) {
            console.log('点赞失败'+err);
        }
    }
    async insertbaby(req,res) {

        // const {name,description,image_paths} = req.body;
        const user_id = req.cookies.user_id;
        const files_arr = [];
        try {
            const form = formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                const {name,description} = fields;
                for(let i in files){
                    files_arr.push(files[i]);
                }
                const image_paths =  await this.getPaths(files_arr);
                const babyModel = new BabyModel({user_id,name,description,image_paths});
                const baby_doc = await babyModel.save();
                res.json(createResData({data:baby_doc}));
            })

        }catch(err) {
            res.json(createResData({code:1,msg:"上传宝贝错误"+err}));
        }

    }

    async getBabyList(req,res) {
        const {pageSize = 10, pageNum = 1} = req.body;
        try {
            let count = 0,total = 0;
            const babys = await BabyModel.find({}).sort({created_at: -1}).limit(Number(pageSize)).skip(Number(pageSize * (pageNum - 1)));
            const babyCount = await BabyModel.count({})
            console.log(babyCount)
            total = babys.length;
            babys.forEach(async (baby,idx) => {
                const userinfo = await UserInfoModel.findOne({user_id:baby.user_id}, '-_id');
                const like_doc = await LikeModel.findOne({user_id:baby.user_id,baby_id:baby._id})
                const comment_count = await CommentModel.count({baby_id:baby._id})
                const hot_flag = !!like_doc;
                babys[idx] = Object.assign({},baby._doc,{username:userinfo.username,avatar:userinfo.avatar,hot_flag,comment_count})
                if(++count === total) {
                    res.json(createResData({data:{list:babys,
                        page:{pageNum,pageSize,pageCount:Math.ceil(babyCount/pageSize),totalCount:babyCount}
                    }}));
                }
            })

        }catch (err) {
            res.json(createResData({code:1,msg:"获取宝贝错误"+err}));
        }

    }

    async login(req,res) {

        const {user,pwd} = req.body;

        try {
            const user_doc = await UserModel.findOne({user,password:md5Pwd(pwd)},_filter)
            if(user_doc){
                const userinfo_doc = await UserInfoModel.findOne({user_id:user_doc.user_id}, '-_id');
                res.cookie('user_id',userinfo_doc.user_id)
                return res.json(createResData({data:userinfo_doc}));
            }else{
                res.json(createResData({code:1,msg:"账号或者密码有误"}));
            }
        } catch (err) {
            return res.json(createResData({code:1,msg:'用户登录'+err}));
        }


    }

    async register(req,res) {

        const {user,pwd} = req.body;

        const user_doc = await UserModel.findOne({user})

        if(user_doc){
            return res.json(createResData({code:1,msg:'用户名已经存在'}));
        }
        try {

            const user_id = await this.getId('user_id');
            const userModel = new UserModel({user,password:md5Pwd(pwd),user_id});
            UserModel.create(userModel);
            const register_time = dtime().format('YYYY-MM-DD HH:mm');
            const newUserInfo = {username:'default', user_id, id: user_id, city: '', register_time, };
            const userInfoModel = new UserInfoModel(newUserInfo);
            const userInfo_doc = await userInfoModel.save();

            res.cookie('user_id',userInfo_doc.user_id)
            res.json(createResData({data:userInfo_doc}));

        }catch(err){
            return res.json(createResData({code:1,msg:'用户注册'+err}));
        }

    }
    async getUserInfo(req,res) {
        const sid = req.cookies.user_id;
        const qid = req.body.user_id;
        const user_id = sid || qid;
        if (!user_id || !Number(user_id)) {
            console.log('获取用户信息的参数user_id无效', user_id)
            res.json(createResData({code:1,msg:'通过session获取用户信息失败'}));
            return
        }
        try{
            const userinfo = await UserInfoModel.findOne({user_id}, '-_id');
            res.json(createResData({data:userinfo}));
        }catch(err){
            console.log('通过session获取用户信息失败', err);
            res.json(createResData({code:1,msg:'通过session获取用户信息失败'}));
        }
    }

    async signout(req, res, next){
        delete req.cookies.user_id;
        res.json(createResData({data:''}));
    }
    async getUserList(req, res, next){
        const {limit = 20, offset = 0} = req.body;
        try{
            const users = await UserInfoModel.find({}, '-_id').sort({user_id: -1}).limit(Number(limit)).skip(Number(offset));
            res.json(createResData({data:users}));
        }catch(err){
            console.log('获取用户列表数据失败', err);
            res.json(createResData({code:1,msg:'获取用户列表数据失败'}));
        }
    }
    async updateUserInfo(req, res) {
        const user_id = req.cookies.user_id;
        try{
            const data = req.body;
            const userinfo_doc = await UserInfoModel.findOneAndUpdate({user_id}, {$set: {...data,is_valid:1}});
            console.log(userinfo_doc)
            res.json(createResData({data:userinfo_doc}));
        }catch(err){
            console.log('更新用户信息失败', err);
            res.json(createResData({code:1,msg:'更新用户信息失败'}));
        }
    }
    async updateAvatar(req, res, next){
        const user_id = req.cookies.user_id;
        console.log( req.session.user_id)
        if (!user_id || !Number(user_id)) {
            console.log('更新头像，user_id错误', user_id)
            res.json(createResData({code:1,msg:'user_id参数错误'}));
            return
        }

        try{
            console.log(req);
            const image_path = await this.getPath(req);
            //await UserInfoModel.findOneAndUpdate({user_id}, {$set: {avatar: image_path}});
            res.json(createResData({data:image_path}));
        }catch(err){
            console.log('上传图片失败', err);
            res.json(createResData({code:1,msg:'上传图片失败'}));
        }
    }

}

function md5Pwd(pwd){
    const salt = 'imooc_is_good_3957x8yza6!@#IUHJh~~'
    return utils.md5(utils.md5(pwd+salt))
}

export default new User();