import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export abstract class BaseCommon{
    public static transform<T>(cls:ClassConstructor<T>,plainObject:object):T{
        if(plainObject instanceof cls){
            return plainObject;
        }
        else{
            return plainToClass(cls,plainObject);
        }
    } 
    public async validateThis(skipMissing:boolean=false):Promise<string[]>{
        const errors = await validate(this,{
            skipMissingProperties: skipMissing,
        });
        const temp = errors.map(item=>{
            if(item.constraints){
                return Object.values(item.constraints);
            }
        });
        let result:string[]=[];
        temp.forEach((item)=>{
            if(item){
                result.push(...item);
            }
        })
        return result;
    }
}