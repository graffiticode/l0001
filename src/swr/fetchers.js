import bent from "bent";
import { postApiCompile } from "../lib/api.js";

export const compile = async ({ accessToken, id, data }) => {
  console.log("compile() accessToken=" + accessToken + " id=" + id);
  try {
    const index = Object.keys(data).length > 0 && 1 || 2; // Empty data so use full id.
    id = id.split("+").slice(0, index).join("+");  // Re-compile state with code id.
    return await postApiCompile({ accessToken, id, data });
  } catch (x) {
    console.log("./utils/swr/fetechers/compile()");
    console.log(x.stack);
  }
};
