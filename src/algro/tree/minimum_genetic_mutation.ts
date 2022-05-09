/**a
 * 433 最小基因变化
 */

function minMutation(start: string, end: string, bank: string[]): number {
	if (!bank.find((i) => i === end)) {
		return -1;
	}

	const bankSet = new Set(bank);
	const memoSet = new Set(start);

	const queue = [start];
	let step = 0;
	while (queue.length > 0) {
		step += 1;

		const n = queue.length;
		for (let i = 0; i < n; i += 1) {
			const cur = queue.shift()!;

			for (let next of getNext(cur)) {
				if (next === end) {
					return step;
				}
				if (bankSet.has(next) && !memoSet.has(next)) {
					queue.push(next);
					memoSet.add(next);
				}
			}
		}
	}

	return -1;
}
const canBe = {
	// 'A'、'C'、'G' 和 'T'
	A: ["C", "G", "T"],
	C: ["A", "G", "T"],
	G: ["C", "A", "T"],
	T: ["C", "G", "A"],
};
function getNext(cur: string) {
	const all = [];

	for (let i = 0; i < 8; i += 1) {
		let t = Array.from(cur);
		const nextChar = canBe[t[i]];

		for (let will of nextChar) {
			t[i] = will;
			all.push(t.join(""));
		}
	}

	return all;
}
