// @ts-nocheck
// 作者：ssh_晨曦时梦见兮
// 链接：https://juejin.cn/post/6844904094079926286
// * 以及更多内容https://juejin.cn/post/6844904115428917255#heading-33
function Promise(fn) {
	this.cbs = [];

	const resolve = (value) => {
		setTimeout(() => {
			this.data = value;
			this.cbs.forEach((cb) => cb(value));
		});
	};

	fn(resolve);
}

Promise.prototype.then =
	function (onResolved) {
		return new Promise((resolve) => {
			this.cbs.push(() => {
				const res = onResolved(this.data);
				if (res instanceof Promise) {
					res.then(resolve);
				} else {
					resolve(res);
				}
			});
		});
	};
