"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    static sendError(err, res) {
        let errors = "";
        if (Array.isArray(err)) {
            errors = err.join(";");
        }
        else {
            errors = err;
        }
        return res.send({
            err: errors,
            data: null,
        });
    }
    static sendData(data, res) {
        return res.send({
            err: '',
            data,
        });
    }
    static sendPageData(pageData, res) {
        if (pageData.errors.length > 0) {
            this.sendError(pageData.errors, res);
        }
        else {
            res.send({
                err: "",
                data: pageData.data,
                total: pageData.count,
            });
        }
    }
}
exports.ResponseHelper = ResponseHelper;
