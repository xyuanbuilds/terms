// https://juejin.cn/post/6844904036873814023
/**
 * 详细分析
 * https://mp.weixin.qq.com/s?__biz=MzI1MzU5MTIyNA==&mid=2247483684&idx=1&sn=4c0cbcd35c054524a36c321cd3a9de5f&chksm=e9d36af3dea4e3e5cd9e17f7fa592b147853ea15d3f76a385be0363a246d5b9da79577820ae0&mpshare=1&scene=1&srcid=&sharer_sharetime=1564021278327&sharer_sha
 */
"0".length; //1;
// * 字符串的length只能获得UTF-16字符的个数
"🎶".length; //2;
"🎶".charCodeAt(0); //55356;
console.log("🎶".charCodeAt(0), "🎶".charCodeAt(1)); // 55356 57270
"🎶".codePointAt(0); //127926;

// Unicode标准中，将字符编码的码位以2**16个为一组，组成为一个平面（Plane），
// 按照字符的码位值，分为17个平面，所有码位从0x000000到0x10FFFF，总共使用3个字节。

// 其中最前面的1个字节是平面编号，从0x0到0x10，一共17个平面。

// 第0号平面被称为基本多文种平面（BMP，Basic Multilingual Plane），
// 这个平面的所有字符码位只需要16位编码单元即可表示，所以它们可以继续使用UTF-16编码。

// 其他的平面被称为辅助平面（supplementary plane），这些平面的字符被称为增补字符，它们的码位均超过16位范围。

// ES5及之前的JavaScript的Unicode相关API，只能以UTF-16来处理BMP的字符，所有字符串的操作都是基于16位编码单元。

// * String.prototype.codePointAt(index) 方法返回字符串指定index位置的字符的Unicode码位，
// * 与旧的charCodeAt方法相比，它能够很好地支持增补字符

console.log(String.fromCodePoint(126980)); // 🀄
// * charCode 需要两个数字
console.log(String.fromCharCode(55356, 57270)); // 🎶

// * 所以codePointAt系列是更好的准确描述字符的方式
