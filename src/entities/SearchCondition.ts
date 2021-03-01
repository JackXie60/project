import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseCommon } from "./BaseCommon";

export class SearchCondition extends BaseCommon{

    @IsInt({message:"页码数必须是整数"})
    @Min(1,{message:"页码数不能够小于1"})
    @Type(()=>Number)
    page:number=1;

    @IsInt({message:"页容量必须是整数"})
    @Min(1,{message:"页容量不能够小于1"})
    @Type(()=>Number)
    limit:number=10;

    @Type(()=>String)
    key:string="";
}