/**
 * ## 问题2
 * 将一个json数据的所有key从下划线改为驼峰
 * @param {object | array} value 待处理对象或数组
 * @returns {object | array} 处理后的对象或数组
 */

export const testData = {
  a_bbb: 123,
  a_g: [1, 2, 3, 4],
  a_d: {
    s: 2,
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

function transform(obj) {
  const newObj = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (typeof obj[key] === "object") {
      newObj[toCamel(key)] = transform(obj[key]);
    } else {
      newObj[toCamel(key)] = obj[key];
    }
  }
  return newObj;
}
function toCamel(str) {
  const chunks = str.split("_");
  return (
    chunks[0] +
    chunks
      .slice(1)
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join("")
  );
}

const res = transform(testData);
console.log(res);
