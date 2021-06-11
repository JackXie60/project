const Template = require("../models/Template");


//查找模板
exports.searchTemplate = async function(appkey,planTime){
    const ins = await Template.findAll({
        where:{
            appkey:appkey,
            planTime:planTime,
        }
    })
    return ins;
}


//添加模板
exports.addTemplate = async function(info){
    const ins = await Template.create(info);
    return ins.toJSON();
}

//修改模板
exports.updateTemplate = async function(id,info){
    const ins = await Template.update(info,{
        where:{
            id:id,
        }
    })
    return ins;
}

//删除模板
exports.deleteTemplate = async function(id){
    const ins = await Template.destroy({
        where:{
            id:id
        }
    })
    return ins;
}
