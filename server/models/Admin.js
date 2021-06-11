const {DataTypes} = require("sequelize")
const {db} = require("./db.js");

const Admin = db.define("user",{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    appkey:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    avator:{
        type:DataTypes.TEXT,
        allowNull:false,
    }
})

module.exports = Admin;