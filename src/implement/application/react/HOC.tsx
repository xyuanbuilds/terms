// const HOC = (cmp) => (props) => HOC_ED
import * as React from 'react';

// eg
const loading = true;
const LoadingHOC = <T extends {}>(C: React.JSXElementConstructor<T>) => (props: T) => {
  if (loading) {
    return 'loading';
  }

  return <C {...props}/>
}

/**
 * * 最左的函数参数，最后执行
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
export default function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    // infer the argument type so it is usable in inference down the line
    return <T extends unknown>(arg: T) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce(
    (pre, cur) =>
      (...args: any) =>
        pre(cur(...args))
  )
}