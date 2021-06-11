const {
    Sequelize
} = require("sequelize");

const sequelize = new Sequelize("todo_list", "root", "XX074614a", {
    host: "127.0.0.1",
    dialect: "mysql"
})
exports.db = sequelize;