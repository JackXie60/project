import { isAwaitExpression, moveSyntheticComments } from "typescript";
import { MovieModel } from "../db";
import { IMovie } from "../db/MovieSchema";
import { ISearchResult } from "../entities/CommonType";
import { Movie } from "../entities/Movie";
import { SearchCondition } from "../entities/SearchCondition";

export class MovieService{
    public static async add(movie:Movie):Promise<IMovie|string[]>{
        //转换数据，将字符串转换为movie类型
        movie = Movie.transform(Movie,movie);
        //进行验证，并且返回验证信息
        const errors = await movie.validateThis();
        if(errors.length>0){
            return errors;
        }
        //添加movie到数据库
        return await MovieModel.create(movie);
    }
    //编辑
    public static async edit(id:string,movie:Movie):Promise<IMovie|string[]>{
        const movieObj = Movie.transform(Movie,movie);
        //进行验证，并且返回验证信息
        const errors = await movieObj.validateThis(true);
        if(errors.length>0){
            return errors;
        }
        return await MovieModel.updateOne({_id:id},movie); 
    }
    //删除
    public static async delete(id:string):Promise<void>{
        await MovieModel.deleteOne({_id:id});
    }
    //查找单个数据
    public static async findById(id:string):Promise<IMovie|null>{
        return await MovieModel.findById(id);
    } 
    //查找多个数据
    public static async find(searchCondition:SearchCondition):Promise<ISearchResult<IMovie>>{
        //进行类型转换，将searchCondition转换为SearchCondition类型
        const condition = SearchCondition.transform(SearchCondition,searchCondition)
        //验证查询条件是否符合
        const errors = await condition.validateThis();
        if(errors.length>0){
            return {
                count:0,
                data:[],
                errors,
            }
        }
        //数据库查询
        const data = await MovieModel.find({
            name:{$regex:new RegExp(condition.key)}
        }).skip((condition.page-1)*condition.limit)
        .limit(condition.limit);
        const count = await MovieModel.count();
        return {
            count,
            data,
            errors:[]
        }
    }
}