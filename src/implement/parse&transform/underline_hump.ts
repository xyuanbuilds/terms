/**
 * 将一个json数据的所有key从下划线改为驼峰
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */

const testData = {
  a_bbb: 123,
  a_g: [1, 2, 3, 4],
  a_d: {
    s: 2,
    c_d_k: 2,
    s_d: 3,
  },
  a_f: [
    1,
    2,
    3,
    {
      a_g: 5,
    },
  ],
  a_d_s: 1,
};

/**
 * 会改变原数据
 * @param value
 * @returns
 */
function transform(value: object) {
  Object.keys(value).forEach((key) => {
    const cur = value[key];

    if (Array.isArray(cur)) {
      cur.forEach((i) => transform(i));
    } else if (typeof cur === "object") {
      transform(cur);
    }

    const newKey = key
      .split("_")
      .map((k, index) => (index === 0 ? k : upTop(k)))
      .join("");

    value[newKey] = cur;
    delete value[key];
  });

  return value;
}
/** 不改变原数据 */
function transform1(value: any) {
  if (typeof value !== "object") return value;
  const obj = {};

  Object.keys(value).forEach((key) => {
    const cur = value[key];

    const newKey = key
      .split("_")
      .map((k, index) => (index === 0 ? k : upTop(k)))
      .join("");

    if (Array.isArray(cur)) {
      obj[newKey] = cur.map((i) => (typeof i === "object" ? transform1(i) : i));
    } else if (typeof cur === "object") {
      obj[newKey] = transform1(cur);
    } else {
      obj[newKey] = cur;
    }
  });

  return obj;
}

function upTop(str: string): string {
  return str[0].toUpperCase().concat(str.slice(1));
}

// const res = transform1(testData);
// console.log(res);
// debugger;
