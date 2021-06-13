const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const path = require("path")
module.exports = {
    entry:{
        index:"./src/index.ts"
    },
    output:{
        path:path.resolve("./dist"),
        filename:"script/[name][chunkhash:4].js",
    },
    resolve:{
        extensions:[".ts",".js"],
    },
    module:{
        rules:[
            {
                test:/.ts$/,
                use:{
                    loader:"ts-loader",
                    options:{
                        transpileOnly:true
                    }
                }
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname,"./public/index.html"),
            filename:"[name].html",
        })
    ]
}