import { mkdir } from "fs";

let a: unknown = 1;

const b: string = a;

const isStr = (v: unknown): v is string => typeof v === "string";
const isStr2 = (v: unknown) => typeof v === "string";

const test = (v: unknown) => {
  if (isStr2(v)) {
    const a = v - 1;
  }
};

type Primitive = string | number | boolean | undefined;
const isPrimitive = (v: unknown): v is Primitive =>
  !!["string", "number", "boolean", "undefined"].find((i) => i === typeof v);

const v = isPrimitive(1);
