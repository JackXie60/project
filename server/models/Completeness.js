const {db} = require("./db");
const {DataTypes} = require("sequelize");

const Completeness = db.define("completeness",{
    time:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    finishedTaskNum:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    appkey:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Completeness;