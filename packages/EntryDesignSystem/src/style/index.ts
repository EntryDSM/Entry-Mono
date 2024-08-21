import { color, colorKeyOfType } from './color';
import { font } from './font';

export const theme = {
    color,
    font,
} as const;

export type { colorKeyOfType };
