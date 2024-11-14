type StateSetter<T> = (newValue: T | ((prevValue: T) => T)) => void;
type StateHook<T> = [T, StateSetter<T>];

function useState<T>(initialValue: T): StateHook<T> {
  let state = initialValue;

  function setState(newValue: T | ((prevValue: T) => T)) {
    if (typeof newValue === "function") {
      state = (newValue as (prevValue: T) => T)(state);
    } else {
      state = newValue;
    }
  }

  return [state, setState];
}

// 使用示例
const [count, setCount] = useState(0);
console.log(count); // 输出: 0

setCount(1);
console.log(count); // 输出: 1

setCount((prevCount) => prevCount + 1);
console.log(count); // 输出: 2
