import React, { Dispatch, createContext, useReducer } from 'react';

type DefaultValue = {
  mdl_tkn: string | null;
};

type SET_MODULE_TOKNE = {
  type: 'SET';
  mdl_tkn: string;
};

type CLEAR_MODULE_TOKEN = {
  type: 'CLEAR';
};

type ActionTypes = SET_MODULE_TOKNE | CLEAR_MODULE_TOKEN;

const defaultValue: DefaultValue = {
  mdl_tkn: null,
};

type dispatch = Dispatch<ActionTypes>;

export const tokenValue = createContext<DefaultValue>(defaultValue);
export const tokenDispatch = createContext<dispatch>(() => null);

const reducer = (state: DefaultValue, action: ActionTypes): DefaultValue => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        mdl_tkn: action.mdl_tkn,
      };
    case 'CLEAR':
      return {
        ...state,
        mdl_tkn: null,
      };
    default:
      return state;
  }
};

export const TokenProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useReducer(reducer, defaultValue);
  return (
    <tokenValue.Provider value={state}>
      <tokenDispatch.Provider value={setState}>
        {children}
      </tokenDispatch.Provider>
    </tokenValue.Provider>
  );
};
