const md5 = require("md5");
const Admin = require("../models/Admin");

exports.addAdmin = async function(info){
    const result = await exports.loginAdmin(info.username,info.password);
    if(result){
        return null;;
    }
    info.password = md5(info.password);
    info.appkey = info.username + "_" + Date.now().toString().substr(-4) + Math.random().toString(16).substr(-4);
    const ins = await Admin.create(info);
    return ins.toJSON();
}
exports.loginAdmin = async function(username,password){
    password = md5(password);
    const ins = await Admin.findOne({
        where:{
            username,
            password,
        }
    })
    if(ins && ins.password==password){
        return ins.toJSON();
    }
    return null;
}
exports.getAdminById = async function(id){
    const ins = await Admin.findOne({
        where:{
            id:id,
        }
    })
    return ins;
}