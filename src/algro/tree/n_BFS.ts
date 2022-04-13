import { isStackNonEmpty as isNonEmpty } from "./DFS";

type Node = { val: number, children: Node[] };

function levelOrder(root: Node | null): number[][] {
	if (!root) {
		return [];
	}

	const queue: Node[] = [root];
	const res: number[][] = [];
	while (isNonEmpty(queue)) {
		let n = queue.length;
		let tmp: number[] = [];

		for (let i = 0; i < n; i += 1) {
			const cur = queue.shift();
			tmp.push(cur.val);

			if (cur.children && cur.children.length > 0) {
				queue.push(...cur.children);
			}
		}

		res.push(tmp);
	}

	return res;
}
