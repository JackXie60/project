const TemplateContent = require("../models/TemplateContent")

//添加模板内容
exports.addTemplateContent = async function(info){
    const result = await TemplateContent.create(info);
    return result;
}

//修改模板内容
exports.updateTemplateContent = async function(id,info){
    const result = await TemplateContent.update(info,{
        where:{
            id,
        }
    })
    return result;
}

//删除模板内容
exports.deleteTemplateContent = async function(id){
    const result = await TemplateContent.destroy({
        where:{
            id,
        }
    })
    return result;
}

//搜索模板内容
exports.searchTemplateContent = async function(id){
    const result = await TemplateContent.findOne({
        where:{
            id,
        }
    });
    return result;
}