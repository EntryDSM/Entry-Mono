declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_BASE_URL: string;
    REACT_APP_MAIN_URL: string;
    REACT_APP_AUTH_URL: string;
    REACT_APP_APPLY_URL: string;
    REACT_APP_ADMIN_URL: string;
  }
}
