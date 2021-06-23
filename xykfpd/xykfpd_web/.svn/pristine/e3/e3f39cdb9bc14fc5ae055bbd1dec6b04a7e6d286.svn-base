const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
	publicPath: '', //根路径
	outputDir: 'dist', //构建输出目录
	assetsDir: 'assets', //静态资源目录（js,css,img,fonts）
	lintOnSave: false, //是否开启eslint保存检测，有效值：true||false||'error'
	productionSourceMap: false,//减少压缩体积 加密代码（2020-9-25）
	devServer: {
		open: false, //运行是是否自动打开浏览器
		//host: 'localhost',
		port: 8080, //默认端口号
		/* 热更新 */
		hotOnly: false,
		proxy: {
			// 	//配置跨域
			'/api': {
				target: process.env.VUE_APP_BASE_API, //接口地址
				// ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/api': '/'
				}
			}
		},
    },
	configureWebpack: config => {
		Object.assign(config, {
			resolve: {
				extensions: ['.js', '.vue', '.json'], // 可以省略后缀名
				alias: { // 别名,在require的时候，可以使用这些别名，来缩短路径的长度
					'@': path.resolve(__dirname, './src'),
					'@c': path.resolve(__dirname, './src/components')
				}
			}
		});
		config.performance = {
			hints: 'warning',
			//入口起点的最大体积 整数类型（以字节为单位）
			maxEntrypointSize: 50000000,
			//生成文件的最大体积 整数类型（以字节为单位 300k）
			maxAssetSize: 30000000,
			//只给出 js 文件的性能提示
			assetFilter: function (assetFilename) {
				return assetFilename.endsWith('.js');
			}
		}
	},

	chainWebpack: config => {
		const oneOfsMap = config.module.rule('scss').oneOfs.store
		oneOfsMap.forEach(item => {
			item
				.use('sass-resources-loader')
				.loader('sass-resources-loader')
				.options({
					// 要公用的scss的路径
					resources: ['./src/styles/common.scss']
				})
				.end()
		});

	}

}