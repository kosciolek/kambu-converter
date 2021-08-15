export const forwardCalls =
  <FUNC extends (...args: any[]) => void>(
    ...funcs: (FUNC | undefined | null)[]
  ) =>
  (...params: Parameters<FUNC>) =>
    funcs.forEach((func) => func?.(...params));
