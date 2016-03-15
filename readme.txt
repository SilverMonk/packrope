①执行npm install 安装依赖的node模块

②执行webpack -d /webpack -p 进行打包 发布文件在dist中

③执行webpack-dev-server 开启开发服务
	ps:webpack-dev-server模块如果安装了找不到 可以试试安装到全局上。
④执行node server/app.js 开启网页服务
	
⑤发布版本 请使用release版本配置文件进行打包 发布文件在release中
	webpack -p --config webpack.config-release.js

备注：由于devserver并不进行模板拷贝，修改模板时，发布文件是没有同步模板文件到发布目录的，可以选择修改模板文件后重新执行webpack -d，或者使用gulp tWatch开启模板文件同步（这不需要先装好gulp和插件gulp-clean,gulp-template）。
不过还要注意现在没有设置node服务自动重启，而修改模板需要重启node服务才能在浏览器生效，这步需要手动完成。

--------------------------------------------------------------------
2016-03-11
	执行runtemplate.bat 准备