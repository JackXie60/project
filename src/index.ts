import "reflect-metadata";
import Express from "express";
import MovieRouter from './route/MovieRouter';
import UploadRouter from './route/UploadRouter';
import history from 'connect-history-api-fallback';

const app = Express();
//movie
app.use(Express.json());
app.use(history());
app.use("/",Express.static("public/build"))
app.use("/upload",Express.static("public/upload"));
app.use("/api/movie",MovieRouter);
//上传图片
app.use("/api/upload",UploadRouter)
//监听端口
app.listen(3000,()=>{
    console.log("监听3000端口中");
});







