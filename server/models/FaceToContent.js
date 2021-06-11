const {db} = require("./db");
const { DataTypes } = require("sequelize");

const faceToMap = db.define("faceToMap",{
    faceId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    contentId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
})

module.exports = faceToMap;