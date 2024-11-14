// https://juejin.cn/post/6966494293242429470
// @ts-nocheck
let isMount = true; // 申明一个全局变量，用来区分 mount 和 update
let workInProgressHook = null; // 申明一个全局变量，作为链表的指针
/**
 * 核心
 * hook链表
 *
 */

// ! fiber对应组件
const fiber = {
  // * 这部分可以理解为 reactElement 相关
  stateNode: App, // stateNode 用来保存当前组件
  // * 这部分可以理解为 react内部状态，也就是fiber实际记录的内容
  memoizedState: null, // 用来保存当前组件内部的状态
};

function useState(initialState) {
  // * 当前处理的 hook 的状态
  let hook;

  if (isMount) {
    // * mount阶段，hook状态需要新建
    hook = {
      memoizedState: initialState,
      next: null, // * 让自定义hook生成链表
      // * update 可多次触发，所以也是队列（链表）
      queue: {
        pending: null,
      },
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      // * 上一个 hook 的next = 当前 hook
      workInProgressHook.next = hook;
    }
    // ! 下一次的 hook
    workInProgressHook = hook;
  } else {
    // * 非mount，hook 获取到 workInProgressHook 指向的内容
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let state = hook.memoizedState;

  if (hook.queue.pending) {
    let curUpdate = hook.queue.pending;

    while (curUpdate) {
      const action = curUpdate.action;
      state = action(state);
      curUpdate = curUpdate.next;
    }

    hook.queue.pending = null; // 循环结束，清空链表
  }

  hook.memoizedState = state;

  console.log("now state", state);

  return [
    state,
    (newState) =>
      dispatchAction.bind(
        null,
        hook.queue,
        typeof newState === "function" ? (old) => newState(old) : () => newState
      )(),
  ];
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };

  if (queue.pending === null) {
    queue.pending = update;
  } else {
    let cur = queue.pending;
    while (cur) {
      if (cur.next === null) {
        cur.next = update;
        break;
      } else {
        cur = cur.next;
      }
    }
  }

  // * schedule 的触发有额外的机制
  schedule();
}

// ! 允许react的调度机制
function schedule() {
  // * 链表结构
  workInProgressHook = fiber.memoizedState; // 让指针指向当前的useState保存的值

  // ! 组件 执行 并 返回内容
  const app = fiber.stateNode(); // 执行组件的渲染函数，将结果保存在app里

  isMount = false; // 首次渲染之后，isMount 变成 false

  return app; // 将fiber.stateNode的结果返回
}

function App() {
  const [num, setNum] = useState(0);
  console.log("num", num);
  return {
    onClick() {
      setNum((n) => n + 1);
      setNum((n) => n + 1);
    },
  };
}

const A = App();

A.onClick();
