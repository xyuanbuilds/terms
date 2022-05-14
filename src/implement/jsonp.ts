/**
 * * JSON with Padding
 * 
 * 1.请求方通过动态创建script标签，并使得script标签的src属性指向响应方即服务器端域名，
 * 	 同时传入一个查询参数“callback”作为请求成功之后页面要执行的函数名；
 * 
 * 2.响应方根据传入的查询参数“callback”来构造形如 callback('你要的数据') 这样的响应。
 *   而‘你要的数据’是 json 格式的内容；
 * 
 * 3.浏览器接收到响应之后，就会执行响应里面的内容，并把这些JSON内容自动转换为可供JavaScript操作的对象，
 *   通过执行这些内容，请求方就会得到他想要的数据了；
 * * 这里浏览器之所以收到后会执行由于 src 发出的 get请求，请求结束后，获得的是一个 callback(json) 的执行语句
 * 
 * * script标签是只能发送get请求的，因此JSONP也只能实现跨域发送get请求
 *
 *  以上三个步骤合起来称为JSONP
 * @param url 
 * @param callback 
 */
function jsonP(url: string, callback: string) {
	const script = document.createElement("script");
	script.type = "text/javascript";

	// * 服务器端通过 query.callback 获取到函数名
	script.src = `${url}?callback=${callback}`;
	document.body.appendChild(script);

	script.onload =
		function () {
			script?.remove();
		};
	script.onerror =
		function () {
			script?.remove();
		};
}
/**
 * JSONP 服务器返回携带json数据的函数调用
 * 
 * ``` server
 * const Koa=require('koa')
 * 
 * let app=new Koa()
 * 
 * app.use((ctx)=>{
 *     let callback=ctx.query.callback
 *     let data={
 *         name:"胡积极",
 *         age:18,
 *         sex:'男'
 *     };
 * 
 *     let dataStr=JSON.stringify(data);
 *     let res=callback+"("+dataStr+")";
 *     ctx.body=res
 * })
 * 
 * app.listen(3000,()=>{
 *     console.log('http://localhost:3000')
 * })
 * 
 * ```
 */
