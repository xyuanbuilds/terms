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
			rect.bottom <= (
				window.innerHeight || document.documentElement.clientHeight
			) && /*or $(window).height() */
			rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
	);
}
