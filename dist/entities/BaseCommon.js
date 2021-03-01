"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommon = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BaseCommon {
    static transform(cls, plainObject) {
        if (plainObject instanceof cls) {
            return plainObject;
        }
        else {
            return class_transformer_1.plainToClass(cls, plainObject);
        }
    }
    validateThis(skipMissing = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(this, {
                skipMissingProperties: skipMissing,
            });
            const temp = errors.map(item => {
                if (item.constraints) {
                    return Object.values(item.constraints);
                }
            });
            let result = [];
            temp.forEach((item) => {
                if (item) {
                    result.push(...item);
                }
            });
            return result;
        });
    }
}
exports.BaseCommon = BaseCommon;
