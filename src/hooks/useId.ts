import { useState } from "react";
import { getId } from "../utils/js";

export const useId = () => {
  const [id] = useState(getId);
  return id;
};
