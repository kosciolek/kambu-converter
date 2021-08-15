export const forwardCalls =
  <FUNC extends (...args: any[]) => void>(
    ...funcs: (FUNC | undefined | null)[]
  ) =>
  (...params: Parameters<FUNC>) =>
    funcs.forEach((func) => func?.(...params));

export const preciseRound = (number: number, places: number = 2) => {
  const factor = 10 ** places;
  return Math.round((number + Number.EPSILON) * factor) / factor;
};

export const getId = () => Math.random().toString().slice(2);

export const preventDefault = (e: { preventDefault: () => any }) =>
  e.preventDefault();

export const firstToUppercase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);
