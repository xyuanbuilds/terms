export interface TrieNode<T = string> {
	children: TrieNode<T>[],
	val: T,
	isEnd?: boolean,
}
abstract class ITrie {
	abstract insert: (word: string) => void;
	abstract search: (word: string) => boolean;
	abstract startsWith: (prefix: string) => boolean;
}

export class Trie implements ITrie {
	static make_node(val: string): TrieNode {
		return { children: [], val };
	}

	_root: TrieNode = { val: "", children: [] };
	_size: number = 0;

	// _insert(word: string, index: number, node: TrieNode) {
	// 	if (index === word.length) {
	// 		return;
	// 	}
	// 	const newNode = Trie.make_node(word[index]);
	// 	this._insert(word, index + 1, newNode);
	// 	node.children.push(newNode);
	// }
	/**
   * 向前缀树中插入一个单词
   * @param word 
	 * @param reverse 是否反向插入word
   */
	insert(word: string, reverse?: boolean): number {
		let increase = 0;
		const DFS = (node: TrieNode, index: number) => {
			const found = node.children.find((i) => i.val === word[index]);
			if (found) {
				if (reverse ? index === 0 : (index + 1) === word.length) {
					found.isEnd = true;
					return;
				}
				DFS(found, reverse ? index - 1 : index + 1);
			} else if (reverse ? index >= 0 : index < word.length) {
				let next = index;
				let prev = node;

				while (true) {
					const nextNode = Trie.make_node(word[next]);
					prev.children.push(nextNode);
					increase += 1;
					reverse ? next -= 1 : next += 1;
					prev = nextNode;
					if (reverse ? next === -1 : next === word.length) {
						nextNode.isEnd = true;
						return;
					}
				}
			}
		};
		DFS(this._root, reverse ? word.length - 1 : 0);
		this._size += increase;
		return increase;
	}

	/**
   * 前缀树中是否有某个单词
   * @param word 
   * @returns 
   */
	search(word: string, prefix?: boolean) {
		let next = 0;
		let prev = this._root;
		while (true) {
			const nextNode = prev.children.find((i) => i.val === word[next]);
			if (!nextNode) {
				return false;
			}
			next += 1;
			prev = nextNode;

			if (next === word.length) {
				if (nextNode.isEnd) {
					return true;
				}
				return prefix ? true : false;
			}
		}
	}

	/**
   * 前缀树中是否存在该前缀的单词
   * @param prefix 
   * @returns 
   */
	startsWith(prefix: string) {
		return this.search(prefix, true);
	}
}
// const trieT = new Trie();
// trieT.insert("abc");
// trieT.insert("abd");
// trieT.insert("abcd");
// console.log(trieT.startsWith("abc"));
// console.log(trieT.startsWith("abd"));
// console.log(trieT.search("ab"));
// console.log(trieT.search("abc"));

// ["Trie", "insert", "search", "startsWith"][[], ["a"], ["a"], ["a"]]
// trieT.insert("a");
// console.log(trieT.search("a"));
// console.log(trieT.startsWith("a"));
