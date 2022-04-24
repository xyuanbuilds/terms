import { Trie } from "../../../internal/Tree/trie_tree";

/**
 * 820 单词的压缩编码
 * 
 * Trie 不仅可以做前缀合并，也可做后缀合并，只要将单词反着插入就行
 * 
 * trie 插入的过程中可以获得 Trie 是否增长，增长则说明单词未被完全覆盖（前/后的包含）
 */
function minimumLengthEncoding(words: string[]): number {
	const trie = new Trie();

	words.sort((s1, s2) => s2.length - s1.length);

	let len = 0;
	// 单词插入trie，返回该单词增加的编码长度
	for (let word of words) {
		debugger;
		const increase = trie.insert(word, true);
		len += increase ? word.length + 1 : 0;
	}
	return len;
}

// minimumLengthEncoding(["time", "me", "bell"]);
minimumLengthEncoding(["time", "atime", "btime"]);
