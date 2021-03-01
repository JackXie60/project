//提供不同的响应格式

import { error } from "console";
import { Response } from "express";
import { IMovie } from "../db/MovieSchema";
import { ISearchResult } from "../entities/CommonType";

export abstract class ResponseHelper{
    //错误
    public static sendError(err:string|string[],res:Response){
        let errors:string = "";
        if(Array.isArray(err)){
            errors = err.join(";");
        }
        else{
            errors = err;
        }
        return res.send({
            err:errors,
            data:null,
        })
    }
    //普通数据
    public static sendData(data:any,res:Response){
        return res.send({
            err:'',
            data,
        })
    }
    //分页数据
    public static sendPageData<T>(pageData:ISearchResult<T>,res:Response){
        if(pageData.errors.length>0){
            this.sendError(pageData.errors,res);
        }
        else{
            res.send({
                err:"",
                data:pageData.data,
                total:pageData.count,
            })
        }
    }
}