export type EventType = string | symbol;

// An event handler can take an optional event argument and should not return a value
export type Handler<T = unknown> = (event: T) => void;

// An array of all currently registered event handlers for a type
export type EventHandlerList<T = unknown> = Array<Handler<T>>;

// A map of event types and their corresponding event handlers.
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
  keyof Events,
  EventHandlerList<Events[keyof Events]>
>;

class Emitter<IEvents extends Record<EventType, unknown>> {
  all: EventHandlerMap<IEvents> = new Map();

  private readonly ONCE = Symbol("once");

  on<T extends keyof IEvents>(
    type: T,
    handler: Handler<IEvents[T]>,
    once?: boolean
  ) {
    const handlers = this.all.get(type) || [];
    if (once) {
      (handler as any)[this.ONCE] = true;
    }
    handlers.push(handler as Handler<IEvents[keyof IEvents]>);
    this.all.set(type, handlers);
  }

  emit<T extends keyof IEvents>(type: T, event: IEvents[T]) {
    const handlers = this.all.get(type) || [];
    /**
     * 创建副本，如果回调函数内继续注册相同事件，会造成死循环
     * 先复制出需要处理的内容，防止死循环
     */
    handlers.slice().forEach((handler) => {
      handler(event);
      if ((handler as any)[this.ONCE]) {
        this.off(type, handler);
      }
    });
  }

  off<T extends keyof IEvents>(type: T, handler: Handler<IEvents[T]>) {
    const handlers = this.all.get(type);
    if (handlers) {
      this.all.set(
        type,
        handlers.filter((h) => h !== handler)
      );
    }
  }
}

const emitter = new Emitter<{
  test: {
    a: string;
  };
}>();
const listener = (e: { a: string }) => {
  console.log(e.a);
};
emitter.on("test", listener);

emitter.emit("test", { a: "yolo" });
emitter.off("test", listener);
emitter.emit("test", { a: "yolo" });
console.log(emitter.all);
