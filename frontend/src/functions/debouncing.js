

export const Debouncing = (fn, time) => {
  let settimefun;
if (settimefun) return clearTimeout(settimefun);
  settimefun = setTimeout(() => {
    fn();
  }, time);
};
