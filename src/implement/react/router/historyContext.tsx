import {createContext} from 'react';

const HistoryContext = createContext<{
  push: (path: string) => void,
  goBack: () => void,
}>(null!);

export default HistoryContext;