// function render(template, data) {
//   const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
//   if (reg.test(template)) {
//     // 判断模板里是否有模板字符串
//     const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
//     template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
//     return render(template, data); // 递归的渲染并返回渲染后的结构
//   }
//   return template; // 如果模板没有模板字符串直接返回
// }

function renderT(template, data) {
  // const reg = /\{\{(\w+)\}\}/;

  // let res = template;
  // while (reg.test(res)) {
  //   const key = reg.exec(res)?.[1]!;
  //   res = res.replace(reg, data[key]);
  // }
  // return res;
  // * replace 第二个参数为函数时，函数第一个参数是匹配内容，第二个参数是捕获内容
  // * 加 g 可以批量处理整个字符串
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    // match: 匹配的子串;  key：括号匹配的字符串
    return data[key];
  });
}

console.log(
  renderT("我是{{name}}，年龄{{age}}，性别{{sex}}", {
    name: "姓名",
    age: 18,
  })
);
