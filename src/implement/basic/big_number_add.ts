// 作者：pany
// 链接：https://zhuanlan.zhihu.com/p/72179476

const a = "9007199254740991";
const b = "1234567899999999999";

export function addBigNumber(na: string, nb: string): string {
  let a = String(na);
  let b = String(nb);
  console.log(a, b);
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength, "0"); //"0009007199254740991"
  b = b.padStart(maxLength, "0"); //"1234567899999999999"

  console.log(a, b);

  let carry = 0; //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i -= 1) {
    const t = Number(a[i]) + Number(b[i]) + carry;
    carry = Math.floor(t / 10);
    // sum = `${Number(sum) + (t % 10)}`;
    sum = (t % 10) + sum;
  }
  if (carry == 1) {
    sum = "1" + sum;
  }
  return sum;
}

console.log(addBigNumber(a, b)); // 1243575099254740990
