class Container {
  private dependencies: Map<string, any> = new Map();

  register(name: string, dependency: any) {
    this.dependencies.set(name, dependency);
  }

  resolve<T>(name: string): T {
    const dependency = this.dependencies.get(name);
    if (!dependency) {
      throw new Error(`Dependency '${name}' not found.`);
    }
    return dependency;
  }
}

// Usage example
class Foo {
  id: any;
  count: any;
  bar() {
    console.log("Hello, World!");
  }
}

const container = new Container();
container.register("foo", new Foo());

const foo = container.resolve<Foo>("foo");
foo.bar();

const customReduce = <T>(
  array: T[],
  callback: (accumulator: T, currentValue: T) => T,
  initialValue: T
): T => {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i]);
  }
  return accumulator;
};

const numbers = [1, 2, 3, 4, 5];
const sum = customReduce(
  numbers,
  (accumulator, currentValue) => accumulator + currentValue,
  0
);
console.log(sum); // Output: 15

const compose = <T>(...fns: ((arg: T) => T)[]): ((arg: T) => T) => {
  return (arg: T) => {
    return fns.reverse().reduce((result, fn) => fn(result), arg);
  };
};

// Usage example
const addOne = (x: number) => x + 1;
const multiplyByTwo = (x: number) => x * 2;
const subtractThree = (x: number) => x - 3;

const composedFunction = compose(addOne, multiplyByTwo, subtractThree);
const result = composedFunction(5);
console.log(result); // Output: 7
