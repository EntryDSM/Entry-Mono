export const color = {
    // orange
    orange50: '#FFF2EA',
    orange100: '#FFCDB1',
    orange200: '#FFB48B',
    orange300: '#FFA26E',
    orange400: '#FF9154',
    orange500: '#FF7E36',
    orange600: '#FF7326',
    orange700: '#FF6C1A',
    orange800: '#FF6814',
    orange900: '#FF640D',
    // green
    green50: '#F8FFFB',
    green100: '#B9ECCF',
    green200: '#80E4AD',
    green300: '#60DC98',
    green400: '#49DE8C',
    green500: '#33D37B',
    green600: '#30DA7C',
    green700: '#28DD78',
    green800: '#1CE174',
    green900: '#15E772',
    // black
    black50: '#FBFBFB',
    black100: '#E6E6E6',
    black200: '#CACACA',
    black300: '#B0B0B0',
    black400: '#969696',
    black500: '#737373',
    black600: '#5F5F5F',
    black700: '#494949',
    black800: '#343434',
    black900: '#141414',
    // extra
    check: '#04DF00',
    error: '#E84045',
    focus: '#006EFF',
    realBlack: '#000000',
    realWhite: '#FFFFFF',
} as const;

export const {
    orange50,
    orange100,
    orange200,
    orange300,
    orange400,
    orange500,
    orange600,
    orange700,
    orange800,
    orange900,
    green50,
    green100,
    green200,
    green300,
    green400,
    green500,
    green600,
    green700,
    green800,
    green900,
    black50,
    black100,
    black200,
    black300,
    black400,
    black500,
    black600,
    black700,
    black800,
    black900,
    check,
    error,
    focus,
    realBlack,
    realWhite,
} = color;

export type colorKeyOfType = keyof typeof color;
