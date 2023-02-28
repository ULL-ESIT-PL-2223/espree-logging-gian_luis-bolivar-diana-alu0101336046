const arrow = (...a) => {
  console.log(`Entering <anonymous function>(...${ a }) at line 1`);
  return a;
};
arrow(1, 2, 3);