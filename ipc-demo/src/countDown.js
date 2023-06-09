module.exports = function countDown(tick) {
  let count = 10;
  let timer = setInterval(() => {
    tick(count--);

    if (count === 0) clearInterval(timer);
  }, 1000);
};
