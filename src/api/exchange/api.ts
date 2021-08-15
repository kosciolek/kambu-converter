import ky from "ky";

export const currencyApi = ky.create({
  prefixUrl: "https://api.exchangerate.host",
});
