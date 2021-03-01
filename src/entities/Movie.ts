import { plainToClass, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, validate } from "class-validator";
import { BaseCommon } from "./BaseCommon";

export class Movie extends BaseCommon{
    @IsNotEmpty({message:"电影名称不能为空"})
    @Type(()=>String)
    public name: string;

    @IsNotEmpty({message:"电影类型不能为空"})
    @ArrayMinSize(1,{message: "电影类型至少有一个"})
    @IsArray({message:"电影类型必须是一个数组"})
    @Type(()=>String)
    public types: string[];

    @IsNotEmpty({message:"上映地区不能为空"})
    @ArrayMinSize(1,{message: "上映地区至少有一个"})
    @IsArray({message:"上映地区必须是一个数组"})
    @Type(()=>String)
    public areas: string[];

    @IsNotEmpty({message:"上映地区不能为空"})
    @IsInt({message:"时长必须为整数"})
    @Min(1,{message:"时长不能小于一分钟"})
    @Max(999,{message:"时长不能大于999分钟"})
    @Type(()=>Number)
    public timelong:number

    @IsNotEmpty({message:"是否火爆不能为空"})
    @Type(()=>Boolean)
    public isHot:boolean=false

    @IsNotEmpty({message:"是否即将上映不能为空"})
    @Type(()=>Boolean)
    public isSoonComing:boolean=false

    @IsNotEmpty({message:"是否经典不能为空"})
    @Type(()=>Boolean)
    public isClassic:boolean=false

    @Type(()=>String)
    public desc?:string

    @Type(()=>String)
    public poster:string

}