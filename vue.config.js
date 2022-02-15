const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

// 是否生产环境
const isProduction = process.env.NODE_ENV === 'production';
// 是否使用cdn
const needCdn = false
// cdn配置
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
       
    },
    // cdn的css链接
    css: [],
    // cdn的js链接
    js: [
        
    ]
}

module.exports = {
    // 基本路径 （取配置文件）
    publicPath: process.env.PUBLIC_PATH,
    // 运行时生成的生产环境构建目录输出路径
    outputDir: 'dist',
    // eslint保存时校验
    lintOnSave: true,
    runtimeCompiler: true,
    assetsDir: "static",
    //  生产环境是否生成 SourceMap
    productionSourceMap: false,
    css: {
        extract: false, // CSS分离插件
        sourceMap: false, // 开启CSS sourceMap
        loaderOptions: {
            // 设置 scss 公用变量文件
            sass: {
              prependData: '@import \'~@/assets/style/public.scss\';'
            }
        }
    },
    // webpack打包
    chainWebpack: config => {
        // 打包时对图片处理 需要依赖image-webpack-loader
        config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({ bypassOnDebug: true }).end(),
            config.plugin('html').tap(args => {
            // 生产环境或本地需要cdn时，才注入cdn
            if (isProduction || needCdn) args[0].cdn = cdn
            return args
        })
        
    },
    configureWebpack: (config) => {
        if (isProduction){
            config.mode = 'production';
        } else{
            config.mode = 'development';
            config.devtool = 'source-map';
        }

        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // 配置compression-webpack-plugin压缩 jscsshtml
            new CompressionWebpackPlugin({
              algorithm: 'gzip',
              test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
              threshold: 10240, // 对超过10k的数据压缩
              minRatio: 0.8
            },{
              test:/\.js$|\.html$|.\css/,
              threshold: 10240,
              deleteOriginalAssets: false // 不删除源文件
            }),
            new webpack.optimize.LimitChunkCountPlugin({
              maxChunks: 5, 
              minChunkSize: 100
            })
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: '8082',
        https: false,
        hot: true,
        open: 'Google Chrome'
    }

};
