declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    VITE_SERVER_URL: string;
    VITE_MAIN_URL: string;
    VITE_AUTH_URL: string;
    VITE_APPLY_URL: string;
    VITE_ADMIN_URL: string;
  }
}
