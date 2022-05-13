import { useContext } from 'react';
import type * as React from 'react';
import HistoryContext from './historyContext';

type P = {
  to: string;
  children: React.ReactNode;
}
function Link(props: P) {
  const history = useContext(HistoryContext);

  const goTo = function() {
    history.push(props.to);
  }

  return (
    <a {...props} onClick={goTo}>{props.children}</a>
  );
}

export default Link;