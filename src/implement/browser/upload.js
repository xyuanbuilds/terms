// * 更完善内容详见
// https://juejin.cn/post/6844904046436843527

function uploadFile(file) {
  var chunkSize = 1024 * 1024;
  var totalSize = file.size;
  var chunkQuantity = Math.ceil(totalSize / chunkSize);
  var offset = 0;

  var reader = new FileReader();
  reader.onload = function (e) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", url);
    xhr.overrideMimeType("application/octet-stream");

    xhr.onreadystatechange = function () {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState
      // 0	UNSENT	代理被创建，但尚未调用 open() 方法。
      // 1	OPENED	open() 方法已经被调用。
      // 2	HEADERS_RECEIVED	send() 方法已经被调用，并且头部和状态已经可获得。
      // 3	LOADING	下载中；responseText 属性已经包含部分数据。
      // 4	DONE	下载操作已完成。
      if (xhr.readyState === 4 && xhr.status === 200) {
        offset += 1;
        if (offset === chunkQuantity) {
          alert("上传完成");
        } else if (offset === chunkQuantity - 1) {
          var blob = file.slice(offset * chunkSize, totalSize);
          reader.readAsBinaryString(blob);
        } else {
          var blob = file.slice(offset * chunkSize, (offset + 1) * chunkSize);
          reader.readAsBinaryString(blob);
        }
      } else {
        alert("上传出错");
      }
    };

    if (xhr.sendAsBinary) {
      xhr.sendAsBinary(e.target.result);
    } else {
      xhr.send(e.target.result);
    }
  };
  var blob = file.slice(0, chunkSize);
  reader.readAsBinaryString(blob);
}
