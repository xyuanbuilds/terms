export const isArr: Predicator<Array<any>> = Array.isArray;

export const isStr: Predicator<string> = (val): val is string =>
  typeof val === "string";

export const isNum: Predicator<number> = (val): val is number =>
  typeof val === "number";

export const isNumLike: Predicator<NumLike> = (val): val is NumLike => {
  if (isNum(val)) return true;
  if (!isStr(val)) return false;
  return !Number.isNaN(Number(val));
};

export const isInt: Predicator<number> = (val): val is number =>
  Number.isInteger(val);

export const isEven: Predicator<number> = (val): val is number =>
  isInt(val) && (val & 1) === 0;
export const isOdd: Predicator<number> = (val): val is number =>
  isInt(val) && (val & 1) === 1;

export const isBool: Predicator<boolean> = (val): val is boolean =>
  typeof val === "boolean";

export const isObj: Predicator<Object> = (val): val is object =>
  typeof val === "object";

export const isPlainObj: Predicator<PlainObject> = (
  val
): val is PlainObject => {
  if (!isObj(val) || val === null) return false;

  let proto = val;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(val) === proto;
};

export const isFn: Predicator<Function> = (val): val is Function =>
  typeof val === "function";

export const isReg: Predicator<RegExp> = (val): val is RegExp =>
  val instanceof RegExp;

export const isSymbol: Predicator<Symbol> = (val): val is Symbol =>
  typeof val === "symbol";
