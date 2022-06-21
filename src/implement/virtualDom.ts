// {
//   tag: 'DIV',
//   attrs:{
//   id:'app'
//   },
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }
// // 把上诉虚拟Dom转化成下方真实Dom
// <div id="app">
//   <span>
//     <a></a>
//   </span>
//   <span>
//     <a></a>
//     <a></a>
//   </span>
// </div>

// vDOM渲染 或 json转html
function _render(
  vNode: string | number | { tag: "string"; attrs: any[]; children: any[] }
) {
  // // 如果是数字类型转化为字符串
  // if (typeof vNode === "number") {
  //   vNode = String(vNode);
  // }
  // * 字符串类型、数字类型直接就是文本节点
  if (typeof vNode === "number" || typeof vNode === "string") {
    return document.createTextNode(`${vNode}`);
  }
  // * 对象构建DOM
  const dom = document.createElement(vNode.tag);
  if (vNode.attrs) {
    // 遍历属性
    Object.keys(vNode.attrs).forEach((key) => {
      const value = vNode.attrs[key];
      dom.setAttribute(key, value);
    });
  }

  // * 子数组递归操作
  vNode.children.forEach((child) => dom.appendChild(_render(child)));
  return dom;
}
