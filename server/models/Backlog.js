const {db} = require("./db");
const { DataTypes } = require("sequelize")

const Backlog = db.define("backlog",{
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    startTime:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    endTime:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    isFinished:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
    planTime: {
        type:DataTypes.STRING,
        allowNull:false
    },
    appkey:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    finishedTime:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    updatedAt:false,
    createdAt:false,
    indexes:[
        {
            name:"time_index",
            fields:[
                {
                    attribute:'endTime',
                    order:"DESC",
                }
            ]
        }
    ]
})

module.exports = Backlog;