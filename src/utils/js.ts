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

export const numToDate = (
  number: number,
  type: "datetime" | "date" | "time" = "datetime"
) => {
  const date = new Date(number);
  switch (type) {
    case "datetime":
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    case "date":
      return date.toLocaleDateString();
    case "time":
      return date.toLocaleTimeString();
    default:
      throw new Error("Wrong conversion type");
  }
};
