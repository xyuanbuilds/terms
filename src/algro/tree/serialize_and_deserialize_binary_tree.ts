import { isStackNonEmpty as isNonEmpty } from "./DFS";

type TreeNode = { val: number, left: null | TreeNode, right: null | TreeNode };

/*
 * Encodes a tree to a single string.
 */
export function serialize(root: TreeNode | null): string {
	if (!root) {
		return "";
	}

	let res: Array<number | null> = [];
	const queue: (TreeNode | null)[] = [root];

	while (isNonEmpty(queue)) {
		const cur = queue.shift();

		if (cur) {
			queue.push(cur.left);
			queue.push(cur.right);
		}

		res.push(cur ? cur.val : null);
	}

	return res.join(",");
}

/*
 * Decodes your encoded data to tree.
 */
export function deserialize(data: string): TreeNode | null {
	if (!data) {
		return null;
	}

	const list = data.split(","); // 序列化字符串split成数组

	const root: TreeNode = { val: Number(list[0]), left: null, right: null }; // 获取首项，构建根节点
	const queue = [root]; // ! 队列辅助子节点设置
	let cursor = 1; // 初始指向list第二项
	// * 在序列化之后的 str 中，有效节点是紧密排列的
	// * 每次循环，queue 中必然有有效节点，且只要指针每次往后走 2 位，必会取到这个有效节点的 left 和 right
	// * 也就是每个有效节点子节点的位置是 2n
	while (cursor < list.length) {
		const node = queue.shift()!; // 考察出列的节点

		console.log(node);
		debugger;

		const leftVal = list[cursor]; // cursor 为此时 node 的 left
		const rightVal = list[cursor + 1]; // cursor + 1 为此事有效 node 的 right

		if (leftVal) {
			const leftNode: TreeNode = {
				val: Number(leftVal),
				left: null,
				right: null,
			}; // 创建左儿子节点
			node.left = leftNode;
			queue.push(leftNode); // !存在节点就需要放入队列检测是否有子节点
		}
		if (rightVal) {
			const rightNode: TreeNode = {
				val: Number(rightVal),
				left: null,
				right: null,
			};
			node.right = rightNode;
			queue.push(rightNode);
		}
		cursor += 2; // 每次循环处理一对
	}
	return root;
}

const testTree: TreeNode = {
	val: 3,
	left: {
		val: 5,
		left: {
			val: 6,
			// left: { val: 61, left: null, right: null },
			// right: { val: 62, left: null, right: null },
			left: null,
			right: null,
		},
		right: {
			val: 2,
			left: { val: 7, left: null, right: null },
			right: { val: 4, left: null, right: null },
		},
	},
	right: {
		val: 1,
		left: { val: 0, left: null, right: null },
		right: {
			val: 8,
			left: { val: 61, left: null, right: null },
			right: { val: 62, left: null, right: null },
		},
	},
};

serialize(testTree);
deserialize(serialize(testTree));
