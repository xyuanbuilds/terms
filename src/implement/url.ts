function parse(str: string) {
  if (!str) {
    return;
  }

  return (
    str
      /* url中参数用 & 分隔 */
      .split("&")
      .reduce((o, kv) => {
        /* key、value 用 = 分隔 */
        const [key, value] = kv.split("=");
        if (!value) {
          return o;
        }

        // ! 嵌套属性，用 [] 分割，split 支持使用正则，此处正则是 集合【 \[ \]】，相当于 [、] 都做分割，分割存在空字符需过滤 */
        toObj(
          o,
          key.split(/[\[\]]/).filter((x) => x),
          value
        );
        return o;
      }, {})
  );
}

function toObj(o: object, path: string[], value: string) {
  let i = 0;
  for (i = 0; i < path.length - 1; i++) {
    if (o[path[i]] === undefined) {
      if (path[i + 1].match(/^\d+$/)) {
        o[path[i]] = {};
      } else {
        o[path[i]] = {};
      }
    }
    o = o[path[i]];
  }
  o[path[i]] = decodeURIComponent(value);
}

let str1 = "a=1&b=2&c=Tom";
let str2 = "aa&&bb&&cc";
let str3 = "a[name]=Tom&a[age]=12&type=why";
let str4 = "a[0]=1&b[name]=23&a[1]=55";

console.log(parse(str1));
console.log(parse(str2));
console.log(parse(str3));
console.log(parse(str4));
// { a: '1', b: '2', c: 'Tom' }
// {}
// { a: { name: 'Tom', age: '12' }, type: 'why' }
// { a: { '0': '1', '1': '55' }, b: { name: '23' } }
/**a
 * * window.location.search 可以获得url中的参数
 * * eg: '?__biz=MzIyMjczODEyMQ==&mid=2247484665&idx=1&sn=841fde0a4ec32f3c9a6e71abe87c44ad&chksm=e829a75fdf5e2e49bbfb9a012fa9afd1baa0393eddf4002f6d1ec06d4c2308f251436ab2db10&token=1644863490&lang=zh_CN'
 */
const testSearch =
  "?__biz=MzIyMjczODEyMQ==&mid=2247484665&idx=1&sn=841fde0a4ec32f3c9a6e71abe87c44ad&chksm=e829a75fdf5e2e49bbfb9a012fa9afd1baa0393eddf4002f6d1ec06d4c2308f251436ab2db10&token=1644863490&lang=zh_CN";
const params = /?(\.+)/.exec(testSearch)?.[1];
const paramArr = params!.split("&");
let paramsObj = {};
paramArr.forEach((param) => {
  if (/=/.test(param)) {
    const [key, value] = param.split("=");
    // * decodeURIComponent
    paramsObj[key] = decodeURIComponent(value);
  } else {
    // * 单纯的 key
    paramsObj[param] = true;
  }
});
