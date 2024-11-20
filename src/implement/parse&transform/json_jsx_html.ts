// https://developer.aliyun.com/article/94334

/**
 * 相关的一些库
 * react-element-to-jsx-string
 * https://github.com/algolia/react-element-to-jsx-string?spm=a2c6h.12873639.article-detail.5.3c864d96RNzeXk
 */
// html to json
const div = document.createElement("div");
div.appendChild(document.body);

function getProps(ele) {
  const props = {};
  Array.from(ele.attributes).forEach(({ name, value }) => {
    props[name === "class" ? "className" : name] = value;
  });
  return props;
}

function transfer(ele) {
  if (ele.tagName) {
    return {
      type: ele.tagName,
      props: getProps(ele),
      children: Array.from(ele.childNodes).map(transfer),
    };
  }

  return ele.nodeValue;
}

console.log(transfer(div.firstElementChild));
