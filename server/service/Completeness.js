const Completeness = require("../models/Completeness")
const {Op} = require("sequelize")

exports.addCompleteness = async function(info){
    const result = await Completeness.create(info);
    return result;
}

exports.searchCompleteness =  async function (startTime,endTime,appkey){
    const result = await Completeness.findAll({
        where:{
            [Op.and]:{
                time:{
                    [Op.and]:{
                        [Op.lt]:endTime,
                        [Op.gt]:startTime,
                    }
                },
                appkey:{
                    [Op.eq]:appkey
                }
            }
        }
    })
    return result;
}

exports.updateCompleteness = async function (id,finishedTaskNum){
    const result = await Completeness.update({finishedTaskNum},{
        where:{
            id,
        }
    })
    return result;
}