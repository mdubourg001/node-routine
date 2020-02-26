## Routine

Inline, Promise based wrapper around JS Web Workers

![GitHub](https://img.shields.io/github/license/mdubourg001/routine.svg)
![npm](https://img.shields.io/npm/v/routine.svg)

```shell
yarn add worker-routine
```

### Usage

Using `async / await`:

```javascript
import routine from "worker-routine";

const inneficientSquare = n => {
  let total = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      total++;
    }
  }
  return total;
};

// spawns two workers running in separate threads
const results = await Promise.all([
  routine(inneficientSquare, 80000),
  routine(inneficientSquare, 80001)
]);

console.log(results[0] * results[1]);
```

Using `Promise.then`:

```javascript
import routine from "worker-routine";

const multiply = (a, b, c) => a * b * c;

routine(multiply, 2, 3, 10).then(
  console.log // => 60
);
```
