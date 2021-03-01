"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const MovieRouter_1 = __importDefault(require("./route/MovieRouter"));
const UploadRouter_1 = __importDefault(require("./route/UploadRouter"));
const app = express_1.default();
app.use(express_1.default.json());
app.use("/upload", express_1.default.static("public/upload"));
app.use("/api/movie", MovieRouter_1.default);
app.use("/api/upload", UploadRouter_1.default);
app.listen(3000, () => {
    console.log("监听3000端口中");
});
