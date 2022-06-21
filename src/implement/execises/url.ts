const str =
  "http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled";

const p = /.*\?(.*)$/.exec(str)?.[1];

let res = {};
p.split("&").forEach((kv) => {
  console.log(kv);
  const [key, v] = kv.split("=");

  if (v === undefined) {
    res[key] = true;
  } else if (res[key]) {
    const curV = /^\d+$/.test(v) ? Number(v) : decodeURIComponent(v);

    if (Array.isArray(res[key])) {
      res[key].push(curV);
    } else {
      res[key] = [res[key], curV];
    }
  } else {
    const curV = /\d+/.test(v) ? Number(v) : decodeURIComponent(v);
    res[key] = curV;
  }
});
console.log(res, p);
// { user: 'anonymous', id: [ 123, 456 ], city: '北京', enabled: true }
