import { useState } from "react";
import { getId } from "../utils/js";

/**
 * Generate an ID stable over the lifecycle.
 */
export const useId = (prefix?: string) => {
  const [id] = useState(() => `${String(prefix)}-${getId()}`);
  return id;
};
