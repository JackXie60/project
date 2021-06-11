const { db } = require("./db.js");
const { DataTypes } = require("sequelize");

const TemplateContent = db.define("templateContent",{
    todolist:{
        type:DataTypes.TEXT,
        allowNull:false,
        get:function(){
            return JSON.parse(this.getDataValue('todolist'));
        },
        set:function(val){
            this.setDataValue('todolist',JSON.stringify(val));
        }
    },
    appkey:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})
module.exports = TemplateContent;