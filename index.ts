import { routine } from "./routine";
import { startTimer } from "./utils";

const inneficientSquare = (n: number): number => {
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      total++;
    }
  }
  return total;
};

const main = async () => {
  console.log("First case: using two synchronous tasks...");
  let timer = startTimer();
  inneficientSquare(80000);
  inneficientSquare(80001);
  timer.stop();

  console.log("Second case: using two awaited asynchronous tasks...");
  timer = startTimer();
  await routine(inneficientSquare, 80000);
  await routine(inneficientSquare, 80001);
  timer.stop();

  console.log("Third case: using two parralellized tasks...");
  timer = startTimer();
  await Promise.all([
    new Promise(r => r(inneficientSquare(80000))),
    new Promise(r => r(inneficientSquare(80001)))
  ]);
  timer.stop();

  console.log("Fourth case: using two 'routines' (worker tasks)...");
  timer = startTimer();
  await Promise.all([
    routine(inneficientSquare, 80000),
    routine(inneficientSquare, 80001)
  ]);
  timer.stop();
};

main();
