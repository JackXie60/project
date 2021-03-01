import Express from "express";
import { MovieService } from "../service/MovieService";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

router.get("/:id",async (req,res)=>{
    try {
        const resultMovie = await MovieService.findById(req.params.id);
        ResponseHelper.sendData(resultMovie,res);
    } catch {
        ResponseHelper.sendData(null,res);
    }
})
router.get("/",async (req,res)=>{
    const result = await MovieService.find(req.query as any);
    ResponseHelper.sendPageData(result,res);
})
router.post("/",async (req,res)=>{
    const result = await MovieService.add(req.body);
    if(Array.isArray(result)){
        console.log(result);
        ResponseHelper.sendError(result,res);
    }
    else{
        ResponseHelper.sendData(result,res);
    }
})
router.put("/:id",async (req,res)=>{
    try {
        const result = await MovieService.edit(req.params.id,req.body);
        if(Array.isArray(result)){
            ResponseHelper.sendError(result,res);
        }
        else{
            ResponseHelper.sendData(result,res);
        }
    } catch {
        ResponseHelper.sendError("id不正确",res);
    }
})
router.delete("/:id",async (req,res)=>{
    try {
        await MovieService.delete(req.params.id);
        ResponseHelper.sendData(true,res);
    } catch {
        ResponseHelper.sendError("id不正确",res);
    }
})
export default router;