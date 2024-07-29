import { createContext, Dispatch, useReducer } from 'react';

interface DefaultValue {
  title: string;
  content: string;
  icon: React.ReactElement | null;
  button: React.ReactElement | null;
}

export type RenderModalAction = {
  type: 'RENDER';
  title?: string;
  content?: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

type CloseModalAction = {
  type: 'CLOSE';
};

type ActionTypes = RenderModalAction | CloseModalAction;

const defaultValue: DefaultValue = {
  title: '',
  content: '',
  icon: null,
  button: null,
};

type dispatch = Dispatch<ActionTypes>;

export const modalState = createContext<DefaultValue>(defaultValue);
export const modalDispatch = createContext<dispatch>(() => null);

const reducer = (state: DefaultValue, action: ActionTypes): DefaultValue => {
  switch (action.type) {
    case 'RENDER':
      return {
        ...state,
        ...action,
        icon: action.icon || null,
      };
    case 'CLOSE':
      return {
        title: '',
        content: '',
        icon: null,
        button: null,
      };
    default:
      return state;
  }
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  return (
    <modalState.Provider value={state}>
      <modalDispatch.Provider value={dispatch}>
        {children}
      </modalDispatch.Provider>
    </modalState.Provider>
  );
};
