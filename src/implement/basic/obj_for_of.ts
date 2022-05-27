/**
 * * 对象默认不支持 for of，因为不具备迭代器属性
 * * 需要为其添加
 */
const a = {
  b: 12,
  c: 32,
};

Object.defineProperty(a, Symbol.iterator, {
  configurable: false,
  value: function iterator() {
    const keys = Object.keys(this);

    let i = -1;

    return {
      next: () => {
        if (i === keys.length - 1) {
          // * 最后一步返回 done
          return { done: true };
        }
        return {
          value: this[keys[(i += 1)]],
          done: false,
        };
      },
    };
  },
});

class IObject extends Object implements Iterable<React.Key> {
  constructor(...args: any[]) {
    super(...args);
  }
  [Symbol.iterator] = () => {
    const keys = Object.keys(this);
    let i = -1;
    return {
      next: () => {
        if (i === keys.length - 1) {
          // * 最后一步返回 done
          return { value: undefined, done: true };
        }
        return {
          value: this[keys[(i += 1)]],
          done: false,
        };
      },
    };
  };
}

const b = new IObject();
b.test1 = 1;
b.test2 = 2;

for (let v of b) {
  console.log(v);
}
