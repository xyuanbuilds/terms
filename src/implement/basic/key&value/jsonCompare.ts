/**
 * 对比 json
 * @param l
 * @param r
 * @returns
 */
function compare(l: object, r: object) {
  if (typeof l !== typeof r) return false;

  if (isObject(l) && isObject(r)) {
    let res = true;

    Object.keys(l).forEach((key) => {
      console.log(l[key], r[key]);
      if (res === true && !compare(l[key], r[key])) {
        res = false;
      }
    });

    for (let key in r) {
    }

    return res;
  }

  return l === r;
}

function isObject(v: any) {
  return v && typeof v === "object";
}

const test1 = {
  a: 1,
  b: {
    c: 4,
    d: 3,
  },
  c: {},
};
const test2 = {
  a: 1,
  b: {
    c: 4,
    d: 3,
  },
  c: null,
};

console.log(compare(test1, test2));
