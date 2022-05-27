/**
 * * 原生 drag 实现
 *
 * ondragstart：设置拖拽元素 ID，并在这里做我们希望做的修改。
 * ondragover：拖动元素放下的时候，浏览器默认不会触发行为，我们需要进行干预，让放置行为发生。
 * ondrop：放置发生时触发此事件。一般拖拽元素会被移动到一个新父元素中。
 * 拖拽过程一共会涉及八个事件：ondrag、ondragend、ondragenter、ondragexit、ondragleave、ondragover、ondragstart 和 ondrop。
 *
 */

const a = (
  <div class="parent">
    <span id="draggableSpan" draggable="true" ondragstart="onDragStart">
      draggable
    </span>
    <span ondragover="onDragOver" ondrop="onDrop">
      dropzone
    </span>
  </div>
);

function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);

  event.currentTarget.style.backgroundColor = "yellow";
}
function onDragOver(event) {
  event.preventDefault();
}

function onDrop(event) {
  const id = event.dataTransfer.getData("text");

  const draggableElement = document.getElementById(id);
  const dropzone = event.target;

  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}
