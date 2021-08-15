export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
} as const;

export type Breakpoints = typeof breakpoints;

export type BreakpointKeys = keyof Breakpoints;
