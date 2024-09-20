import process from 'process';

const isLocalhost = window.location.href.includes('localhost');
const isStag = window.location.href.includes('stag');

// export const COOKIE_DOMAIN = window.location.href.includes('localhost')
//   ? 'localhost'
//   : 'entrydsm.hs.kr';

// test
export const COOKIE_DOMAIN =
  process.env.NODE_ENV === 'development' ? 'localhost' : 'entrydsm.hs.kr';
console.log('쿠키 도메인: ', COOKIE_DOMAIN);
console.log('삼항연산자 확인:', process.env.NODE_ENV === 'development');
console.log('NODE_ENV:', process.env.NODE_ENV);

export const MAIN_URL = import.meta.env.VITE_MAIN_URL;

export const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const APPLY_URL = import.meta.env.VITE_APPLY_URL;

export const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;
