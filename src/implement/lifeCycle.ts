const EFFECTS: {
  lifeCycles: LifeCycle[];
} = {
  lifeCycles: [],
};

type LifeCycle = {
  type: string;
  notify: (type: string, ...args: any) => void;
};

const initLifeCycle =
  (type: string) =>
  (cb: (...args: any) => any): LifeCycle => {
    function listener(curType: string, ...args: any) {
      if (curType === type) {
        cb(...args);
      }
    }

    return {
      notify(notifyType: string, ...args) {
        listener(notifyType, ...args);
      },
      type,
    };
  };

const formInit = initLifeCycle("onFormInit");

export function createHeart() {
  return {
    publish(type: string, ...args: any) {
      EFFECTS.lifeCycles.forEach((lifecycle) => {
        lifecycle.notify(type, ...args);
      });
    },
    setLifeCycles(newLifeCycles: LifeCycle[] = []) {
      EFFECTS.lifeCycles = EFFECTS.lifeCycles.concat(
        newLifeCycles.reduce((buf: LifeCycle[], item: LifeCycle) => {
          if ("notify" in item) {
            return buf.concat(item);
          }
          return buf;
        }, [])
      );
    },
    clear() {
      EFFECTS.lifeCycles = [];
    },
  };
}

const heart = createHeart();
const i = formInit((a) => {
  console.log(111, a);
});

heart.setLifeCycles([i]);

setTimeout(() => {
  heart.publish(i.type, 10);
}, 2000);
