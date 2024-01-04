import { createContext, useState } from 'react';

export const TransitionContext = createContext();

export function TransitionStateProvider({ children }) {
  const [transitionState, setTransitionState] = useState({
    isLoading: false,
    loaded: false,
    error: null,
    hasError: false,
  });

  return (
    <TransitionContext.Provider value={{ transitionState, setTransitionState }}>
      {children}
    </TransitionContext.Provider>
  );
}
