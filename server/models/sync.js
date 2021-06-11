require("./Admin");
require("./Template");
require("./TemplateContent");
require("./FaceToContent");
require("./Backlog")
require("./Completeness")
const {db} = require("./db")

db.sync({alter:true}).then(()=>{
    console.log("所有模型已同步完成")
})