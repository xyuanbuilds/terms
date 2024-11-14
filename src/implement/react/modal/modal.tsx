import * as React from "react";
import * as ReactDOM from "react-dom";

/**
 * Modal
 * https://zhuanlan.zhihu.com/p/377376413
 * * 1. 弹出层添加到应用根节点之后（body最后）
 *
 * * Portal 组件: 改变 React 节点树与 DOM 树的映射关系，我们实现了
 *
 * <Modal>
 *   <ModalMask />
 *   <ModalContent>
 *     <div>This is a simple modal</div>
 *   </ModalContent>
 * </Modal>;
 */

/**
 * 功能核心，往body底部插入一个元素
 * @param param0
 * @returns
 */
export const Portal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // * 创建一个 container 节点，作为 portal 的容器节点
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  if (!containerRef.current) {
    containerRef.current = document.createElement("div");
    // 将 container 节点添加到 document.body
    document.body.appendChild(containerRef.current);
  }

  // 当组件销毁时，移除 container 节点
  React.useEffect(() => {
    return function cleanup() {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, containerRef.current);
};

export const Modal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Portal>{children}</Portal>;

/** 通过对所有弹层定义 zIndex 固定值来维持覆盖关系 */
const zIndex = {
  mobileStepper: 1000,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};
const modalMaskStyles: React.CSSProperties = {
  zIndex: zIndex.modal,
  background: "rgba(0,0,0,0.65)",
  position: "fixed",
  height: "100%",
  inset: 0,
  overflow: "auto",
  outline: 0,
};
const modalStyles: React.CSSProperties = {
  position: "relative",
  top: "100px",
  width: "500px",
  background: "#fff",
  margin: "0 auto",
};
const modalWarp: React.CSSProperties = {
  zIndex: zIndex.modal,
  position: "fixed",
  inset: 0,
  overflow: "auto",
  outline: 0,
};

/**
 * ModalMask 是一个带背景色的全屏遮罩层
 * @param param0
 * @returns
 */
export const ModalMask = () => <div style={modalMaskStyles} />;

export function ModalDemo() {
  const [isOpen, setS] = React.useState(false);
  const open = () => setS(true);
  const close = () => setS(false);

  return (
    <div>
      <button type="button" onClick={open}>
        Open Modal
      </button>
      {isOpen && (
        // Modal 即是提供 Portal 功能的组件
        <Modal>
          {/* 仅做Mask样式 */}
          <ModalMask />
          <div onClick={close} style={modalWarp}>
            <div onClick={(e) => e.stopPropagation()} style={modalStyles}>
              <div>This is a simple modal</div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
