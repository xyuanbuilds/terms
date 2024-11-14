const aTest = {
  a: {
    b: "hello ",
    c: {
      d: "world",
    },
  },
  e: "hello world",
};

// // 转换为
// {
//     'a.b': 'hello',
//     'a.c.d': 'hello world',
//     'e': 'hello wolrd'
// }

function flatObj(obj: object) {
  const res = {};

  // * 递归中维持 str，value 为基本类型时进行设置
  function keyToStr(str: string, value: any) {
    if (typeof value !== "object" || value === null) {
      res[str] = value;
    } else {
      Object.keys(value).forEach((i) => {
        keyToStr(str ? `${str}.${i}` : i, value[i]);
      });
    }
  }

  keyToStr("", obj);
  return res;
}

console.log(flatObj(aTest));
