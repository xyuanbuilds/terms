const possibilities = {
  0: [1, 3],
  1: [0, 4, 2],
  2: [1, 5],
  3: [0, 4],
  4: [3, 1, 5],
  5: [4, 2],
};

const target = "123450";

/**
 * 773
 * BFS、set缓存
 */
function slidingPuzzle(board: number[][]): number {
  const start = board[0].join("").concat(board[1].join(""));

  const q = [start];
  const visited = new Set();
  let times = 0;
  while (q.length > 0) {
    const l = q.length;
    for (let o = 0; o < l; o += 1) {
      const cur = q.shift();

      if (cur === target) {
        return times;
      }

      const curZero = cur.indexOf("0");
      const will = possibilities[curZero];

      for (let i = 0; i < will.length; i += 1) {
        const newBorad = cur.split("");
        const prev = cur[will[i]];

        newBorad[curZero] = prev;
        newBorad[will[i]] = "0";

        const r = newBorad.join("");

        if (!visited.has(r)) {
          q.push(r);
          visited.add(r);
        }
      }
    }
    times += 1;
  }

  return -1;
}

const res = slidingPuzzle([
  [1, 2, 3],
  [4, 0, 5],
]);
debugger;
