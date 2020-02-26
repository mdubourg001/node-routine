const startTimer = (start = new Date().getTime()) => ({
  start,
  stop: () => console.log(new Date().getTime() - start)
});

export { startTimer };
