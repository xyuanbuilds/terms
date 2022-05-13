import * as React from 'react';
import RouterContext from './routerContext';

/**
 * 消费 RouterContext
 * @param props 
 * @returns 
 */
export function Route(props: { component: React.JSXElementConstructor<{}>, path: string}) {
  const {component: Component, path: componentPath} = props;
  
  return (
    <RouterContext.Consumer>
      {(path) => {
        return componentPath === path ? <Component /> : null;
      }}
    </RouterContext.Consumer>
  );
}

export default Route;