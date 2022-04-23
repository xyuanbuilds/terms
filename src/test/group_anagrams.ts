/**
 * 49 
 * 
 * 寻找唯一标识
 * 有了唯一标识 -> 哈希表key -> 缓存用于后续比对及结果存储
 */
function groupAnagrams(strs: string[]): string[][] {
	if (strs.length <= 1) {
		return [strs];
	}
	const res: Map<string, string[]> = new Map();

	for (let str of strs) {
		const key = [...str].sort((a, b) => a.codePointAt() - b.codePointAt()).join(
			"",
		);

		if (res.has(key)) {
			res.get(key)!.push(str);
		} else {
			res.set(key, [str]);
		}
	}
	const tmp: string[][] = [];
	res.forEach((i) => {
		tmp.push(i);
	});
	return tmp;
}
// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
