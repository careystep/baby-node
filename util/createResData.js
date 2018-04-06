
//code 状态号码
//data 数据
//msg 提示信息
export default function createResData({code=0,data=null,msg=""}) {
    return {code,data,msg};
}