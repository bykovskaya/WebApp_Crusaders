var path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./public/index.jsx", // входная точка - исходный файл
    output: {
        path: path.resolve(__dirname, './final_src'),     // путь к каталогу выходных файлов - папка public
        publicPath: '',
        filename: "bundle.js"       // название создаваемого файла
    },
    module: {
        rules: [   //загрузчик для jsx
            {
                test: /\.jsx?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: "./public/index.html"
        })
    ]
}