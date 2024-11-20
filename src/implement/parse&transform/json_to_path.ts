// 将一个深度嵌套的对象扁平处理，例如：
// const source = {
//   name: "张三",
//   age: 18,
//   array: [
//     { name: "张三", age: 18 },
//     { name: "张三", age: 18 },
//   ],
//   obj: { name: "张三", age: 18 },
// };
// 结果：
// const result = {
//     "name": "张三",
//     "age": 18,
//     "array[0].name": "张三",
//     "array[0].age": 18,
//     "array[1].name": "张三",
//     "array[1].age": 18,
//     "obj.name": "张三",
//     "obj.age": 18,
// }

function parse(obj: object) {
  const res = {};
  const stack = Object.keys(obj).map((key) => {
    return {
      cur: key,
      value: obj[key],
    };
  });

  while (stack.length > 0) {
    const { cur, value } = stack.pop()!;

    if (!isObj(value)) {
      res[cur] = value;
    } else {
      stack.push(
        ...Object.keys(value).map((key) => {
          // 如果微整数，说明是数组 key
          if (/\d/.test(key)) {
            return {
              cur: `${cur}[${key}]`,
              value: value[key],
            };
          } else {
            // 否认则直接拼接
            return {
              cur: `${cur}.${key}`,
              value: value[key],
            };
          }
        })
      );
    }
  }

  return res;
}

function isObj(v: unknown): v is Array<any> | object {
  return v ? typeof v === "object" : false;
}

const source = {
  name: "张三",
  age: 18,
  array: [
    { name: "张三", age: 18 },
    { name: "张三", age: 18 },
  ],
  obj: { name: "张三", age: 18 },
};

const parseFn = (obj: object) => {
  const res = {};

  const stack = Object.keys(obj).map((key) => {
    return {
      curKey: key,
      value: obj[key],
    };
  });

  while (stack.length > 0) {
    const cur = stack.pop()!;

    if (typeof cur.value === "object") {
      stack.push(
        ...Object.keys(cur.value).map((childKey) => {
          return {
            curKey: /\d/.test(childKey)
              ? `${cur.curKey}[${childKey}]`
              : `${cur.curKey}.${childKey}`,
            value: cur.value[childKey],
          };
        })
      );
    } else {
      res[cur.curKey] = cur.value;
    }
  }

  return res;
};

const resParse = parseFn(source);
console.log(parseFn(source));
