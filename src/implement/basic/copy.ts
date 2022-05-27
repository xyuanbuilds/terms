// * https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
// * structuredClone 用于深拷贝，且可转移引用
// * /^(RegExp|Date)$/i.test(constructor.name) 判断

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

/**
 * 简单版深拷贝：只考虑普通对象属性，不考虑内置对象和函数。
 * @param obj
 * @returns
 */
function deepClone1(obj: object) {
  if (typeof obj !== "object") return;
  const newObj = obj instanceof Array ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key];
    }
  }
  return newObj;
}

//* 数组、函数、对象
const isObject = (target: unknown): target is object =>
  (typeof target === "object" || typeof target === "function") &&
  target !== null;

/**
 * 解决循环引用，考虑内置类型
 * @param target
 * @param cache
 * @returns
 */
function deepClone(target: object | null | undefined, cache = new WeakSet()) {
  if (target === null || target === undefined) {
    return target;
  }

  // ! 利用 WeakSet 缓存引用类型
  // ! 如果是已经处理过的，说明是循环引用，直接返回
  if (cache.has(target)) {
    return target;
  }

  // * 检测当前对象target是否与正则、日期格式对象匹配
  // * 所有的特殊对象，优先处理
  if (/^(RegExp|Date)$/i.test(target.constructor.name)) {
    // * 重新构造一次
    return new (target.constructor as ObjectConstructor)(target);
    // ! 不可这样 var b = a.constructor(a)
    // * 不 new 一次相当于直接返回引用
  }

  if (isObject(target)) {
    // 每个引用类型都需要放到缓存中
    cache.add(target); // 为循环引用的对象做标记

    // * 判断是数组还是对象还是函数，然后拷贝他们的属性，设置拷贝用容器
    const cloneTarget = Array.isArray(target)
      ? []
      : target instanceof Function
      ? function tmp(...args: any[]) {
          return target.call(null, ...args);
        }
      : {};
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        // * 递归深拷贝
        cloneTarget[prop] = deepClone(target[prop], cache);
      }
    }

    return cloneTarget;
  } else {
    return target;
  }
}

// 复习
function isObject1(a: any) {
  return a && typeof a === "object";
}
function deepClone11(target: object | null, cache = new WeakSet()) {
  if (target === null || !isObject(target)) {
    return target;
  }

  if (cache.has(target)) {
    return target;
  }

  if (/Date|RexExp/.test(target.constructor.name)) {
    return new target.constructor(target);
  }

  const container = Array.isArray(target)
    ? []
    : target instanceof Function
    ? (...args) => target.call(null, ...args)
    : {};

  // ! for in 会遍历原型上的所有属性，这样是不可以的
  for (let key in target) {
    // if (isObject(target[key])) {
    // container[key] = deepClone(target[key], cache);
    // } else {
    //   container[key] = target[key]
    // }
    if (target.hasOwnProperty(key)) {
      container[key] = deepClone(target[key], cache);
    }
  }

  // * 或者直接用 Object.keys
  Object.keys(target).forEach((key) => {
    container[key] = deepClone(target[key], cache);
  });

  return container;
}
