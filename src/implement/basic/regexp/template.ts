/**
 * 
 * * template str 内容递归修改，直到无法再有匹配为止
 * 
 * * 此处使用 \w+ 以对有效位置进行匹配。/\{\{(\w+)\}\}/
 * 
 * * \w* 会匹配 undefined 的情况，所以如果需要检查是否存在异常，可以使用
 * ```
 * /\{\{(\w*)\}\}/.exec('{{}}')
 * ['{{}}', '', index: 4, input: '{{}}', groups: undefined]
 * ```
 * 常用匹配符号
 * * \d 数字
 * * \s 空白
 * * \w 单字符，字母数字下划线，等价 [A-Za-z0-9_]
 * * 以上的大写，为匹配他们的 非，\D 等价 [^0-9]
 * 
 * @param template 
 * @param data 
 * @returns 
 */
export function render(template: string, data: object): string {
	const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
	if (reg.test(template)) {
		// 判断模板里是否有模板字符串
		const name = reg.exec(template)![1]; // 查找当前模板里第一个模板字符串的字段
		template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
		return render(template, data); // 递归的渲染并返回渲染后的结构
	}
	return template; // 如果模板没有模板字符串直接返回
}

const template = "我是{{name}}，年龄{{age}}，性别{{sex}}";
const person = { name: "布兰", age: 12 };
render(template, person); // 我是布兰，年龄12，性别undefined
