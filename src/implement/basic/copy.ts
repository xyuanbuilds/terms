function shallowCopy(a: object) {
  return { ...a };
}

// type NotAllow = Map<any, any> | Set<any> | Date | RegExp | ArrayBuffer | BigInt

type Obj = {
  [key: React.Key]: number | string | Obj | null;
};
/**
 * undefined，Function 不会保留 key，会被剔除
 * 循环引用会导致报错
 * 内置复杂对象报错：JS built-ins like Map, Set, Date, RegExp or ArrayBuffer.
 * @param a
 * @returns
 */
function simpleDeepCopy(a: Obj) {
  return JSON.parse(JSON.stringify(a));
}

simpleDeepCopy({ a: { b: 12 } });

// * https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
// * structuredClone 用于深拷贝，且可转移
