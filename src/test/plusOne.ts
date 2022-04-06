function plusOne(digits: number[]): number[] {
  if (digits[0] === 0) return [1];

  if (digits[digits.length - 1] < 9) {
    digits[digits.length - 1] = digits[digits.length - 1] + 1;
    return digits;
  }

  let res = [0];
  let need = true;
  let tmpIndex = digits.length - 2;
  for (let i = digits.length - 2; i >= 0; i -= 1) {
    if (need) {
      const tmp = digits[i] + 1;
      if (tmp === 10) {
        res.unshift(0);
        need = true;
        tmpIndex = i;
      } else {
        res[i] = tmp;
        need = false;
        tmpIndex = i + 1;
        break;
      }
    }
  }

  if (need) return [1].concat(res);

  return digits.slice(0, tmpIndex).concat(res);
}
