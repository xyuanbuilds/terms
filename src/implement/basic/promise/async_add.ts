/**
 * 有一个asyncAdd的第三方异步方法
 * 实现sum函数，内部调用asyncAdd 方法
 * 尽量快的进行多个数的sum
 * @param a
 * @param b
 * @returns
 */
const asyncAdd = (a: number, b: number): Promise<number> => {
  return new Promise((r) => {
    setTimeout(() => {
      const res = a + b;
      r(res);
    }, 1000);
  });
};
const asyncAddCB = (a: number, b: number, cb: (res: number) => void) => {
  setTimeout(() => {
    const res = a + b;
    cb(res);
  }, 1000);
};

export async function sum(...nums: number[]) {
  // * 递归处理，返回值可能是 数组，或单个值
  async function re(...args: number[]): Promise<number[] | number> {
    let tmp: number[] = [];
    let execting = [];
    for (let i = 0; i < args.length; i += 1) {
      const num = args[i];
      // * tmp 计数，达到 2 调用异步任务
      tmp.push(num);
      if (tmp.length === 2) {
        execting.push(asyncAdd(...(tmp as [number, number])));
        tmp = [];
      } else if (i === args.length - 1 && tmp.length === 1) {
        execting.push(tmp.pop()!);
      }
    }

    const res = await Promise.all(execting);

    if (res.length === 1) {
      return res[0]; // * 单个值直接返回，结束递归
    } else {
      // * res >= 2 说明还需要继续计算，递归处理
      return re(...res);
    }
  }

  return re(...nums);
}
export async function sumCB(...nums: number[]) {
  async function re(...args: number[]): Promise<number[] | number> {
    let tmp: number[] = [];
    let execting = [];

    for (let i = 0; i < args.length; i += 1) {
      const num = args[i];
      tmp.push(num);

      if (tmp.length === 2) {
        execting.push(
          new Promise<number>((r) => {
            asyncAddCB(...(tmp as [number, number]), (res) => {
              r(res);
            });
          })
        );
        tmp = [];
      } else if (i === args.length - 1 && tmp.length === 1) {
        // * 如果
        execting.push(tmp.pop()!);
      }
    }

    const res = await Promise.all(execting);

    if (res.length === 1) {
      return res[0];
    } else {
      return re(...res);
    }
  }

  return re(...nums);
}

function promisfy(fn) {
  return (...args, cb) => {
    return new Promise<number>((r) => {
      fn(...args, (res) => {
        cb(res);
        r(res);
      });
    });
  };
}

async function test() {
  const total1 = await sum(1, 2, 3, 4, 5, 6, 7);
  const total2 = await sum(8, 9, 10, 11);
  const total3 = await sumCB(1, 2, 3, 4);
  console.log(total1, total2, total3);
  return [total1, total2];
}

test();
