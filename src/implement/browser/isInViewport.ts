/**
 * 判断元素是否在可视区域
 * @param el
 * @returns
 */
export function isElementInViewport(el: Element) {
  const rect: DOMRect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      document.documentElement.clientHeight /*or $(window).height() */ &&
      // window.innerHeight || document.documentElement.clientHeight
    rect.right <=
      document.documentElement.clientWidth /*or $(window).width() */
      // window.innerWidth || document.documentElement.clientWidth
  );
}
