import { useState } from "react";
import { getId } from "../utils/js";

/**
 * Generate an ID stable over the lifecycle.
 */
export const useId = () => {
  const [id] = useState(getId);
  return id;
};
