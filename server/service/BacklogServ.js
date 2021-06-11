const Backlog = require("../models/Backlog");
const { Op } = require("sequelize")

//添加待办事项
exports.addBacklog = async function (info){
    const result =  await Backlog.create(info);
    return result;
}

//删除待办事项
exports.deleteBacklog = async function (id){
    const result = await Backlog.destroy({
        where:{
            id,
        }
    })
    return result;
}

//更新待办事项
exports.updateBacklog = async function (id,info){
    const result = await Backlog.update(info,{
        where:{
            id,
        }
    })
    return result;
}

//查找待办事项
//查找条件appkey,endTime要小于一定的时间范围，planTime满足要求
exports.searchBacklog = async function (appkey,time,planTime){
    const result = await Backlog.findAll({
        where:{
            [Op.and]:[
                {
                    appkey:{
                        [Op.eq]:appkey,
                    },
                    endTime:{
                        [Op.gt]:time,
                    },
                    startTime:{
                        [Op.lt]:time,
                    },
                    planTime:{
                        [Op.eq]:planTime
                    }
                }
            ]
        }
    })
    return result;
}

//根据时间查找事项
exports.searchBacklogWithoutPlan = async function(appkey,startTime,endTime){
    const result = await Backlog.findAll({
        where:{
            [Op.and]:{
                appkey:{
                    [Op.eq]:appkey,
                },
                finishedTime:{
                    [Op.and]:{
                        [Op.lt]:endTime,
                        [Op.gt]:startTime
                    }
                },
            }
        }
    })
    return result;
}
//查找在今天之内要过期的待办事项
exports.searchSoonExpire = async function(appkey,endTime,nowTime){
    const result = await Backlog.findAll({
        where:{
            [Op.and]:{
                appkey:{
                    [Op.eq]:appkey,
                },
                endTime:{
                    [Op.and]:{
                        [Op.or]:{
                            [Op.lt]:endTime,
                            [Op.eq]:endTime,
                        },
                        [Op.gt]:nowTime,
                    }
                },
            }
        }
    })
    return result;
}