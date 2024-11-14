function isChrome() {
  const userAgent = navigator.userAgent;
  const isChromium = userAgent.indexOf("Chrome") > -1;
  const isEdge = userAgent.indexOf("Edg") > -1;
  const isOpera = userAgent.indexOf("OPR") > -1;
  const isBrave = userAgent.indexOf("Brave") > -1;
  const isSamsung = userAgent.indexOf("Samsung") > -1;

  return isChromium && !isEdge && !isOpera && !isBrave && !isSamsung;
}
