// * 简单的 文件内容 转换

function randomString(length: number) {
	const code = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
	let result = "";
	for (let index = 0; index < length; index++) {
		result += code[Math.floor(Math.random() * code.length)];
	}
	return result;
}
function isString(text: any) {
	try {
		return typeof eval(text) === "string";
	} catch (err) {
		return false;
	}
}

const requireRegex = /_{0,2}require\s*\(\s*(["'].*["'])\s*\)/g;
const IMPORT_STRING_PREFIX = "__require_for_vite";

function transformRequire(code: string, id: string) {
	const requireMatches = code.matchAll(requireRegex);
	let importsString = "";
	let packageName = "";
	let replaced = false;
	for (let item of requireMatches) {
		if (!isString(item[1])) {
			console.warn(`Not supported dynamic import, file:${id}`);
			continue;
		}
		replaced = true;
		packageName = `${IMPORT_STRING_PREFIX}_${randomString(6)}`;
		importsString += `import * as ${packageName} from ${item[1]};\n`;
		code = code.replace(item[0], `${packageName}.default || ${packageName}`);
	}
	if (replaced) {
		code = importsString + code;
	}
	code = code.replace("module.exports =", "export default");
	return code;
}

transformRequire("");
