import { action } from "easy-peasy";

export var storage = {
  site: {
    dark: false,
    setDark: action((state, payload) => {
      state.dark = payload;
    }),
  },
};
