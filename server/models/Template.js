const {db} = require("./db.js")
const {DataTypes} = require("sequelize")

const Template = db.define("template",{
    imgSrc:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    planTime:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    appkey:{
        type:DataTypes.STRING,
        allowNull:false,
    }
})
module.exports = Template;