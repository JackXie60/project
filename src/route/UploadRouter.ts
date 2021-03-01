import Express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();
//存储的配置（文件夹和文件名）
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../public/upload"),
  filename: function (req, file, cb) {
    const filename = new Date().getTime();
    //后缀名
    const extname = path.extname(file.originalname);
    cb(null, `${filename}${extname}`);
  },
});
//允许上传的文件格式
const allowExtension = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024, //文件大小
  },
  fileFilter(req, file, cb) {
      if(allowExtension.includes(path.extname(file.originalname))){
          cb(null,true)
      }
      else{
          cb(new Error("文件类型不匹配"));
      }
  },
}).single("imgfile");
router.post("/", function (req, res) {
  upload(req, res, (err) => {
    if (err) {
      ResponseHelper.sendError(err, res);
    } else {
      const url = `/upload/${req.file.filename}`
      ResponseHelper.sendData(url, res);
    }
  });
});
export default router;
