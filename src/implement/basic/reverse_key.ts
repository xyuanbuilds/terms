//* 翻转字符串或数组
const reverseKey = (v: string | number) => {
  const t = typeof v;

  const r = String(v).split("").reverse().join("");

  return t === "number" ? Number(r) : r;
};

console.log(reverseKey(12345));
console.log(reverseKey("12345"));
