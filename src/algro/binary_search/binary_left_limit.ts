/**
 * 875
 */
function minEatingSpeed(piles: number[], h: number): number {
  // const m = piles.sort((a, b) => b - a)[0];
  const m = Math.max(...piles);

  let left = 1;
  let right = m;
  while (left < right) {
    // const mid = Math.floor((left + right ) / 2);
    const mid = Math.floor(left + (right - left) / 2);
    if (canFinish(piles, mid, h)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

function canFinish(piles: number[], speed: number, h: number) {
  let t = 0;
  for (let cur of piles) {
    t += Math.ceil(cur / speed);
    if (t > h) return false;
  }

  return true;
}
