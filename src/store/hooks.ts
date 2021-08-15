import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureAppStore, RootState } from "./index";

export type Store = ReturnType<typeof configureAppStore>;
export type AppDispatch = Store["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
