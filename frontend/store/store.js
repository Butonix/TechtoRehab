import { action } from "easy-peasy";

export var storage = {
  site: {
    dark: true,
    setDark: action((state, payload) => {
      state.dark = payload;
    }),
  },
};
