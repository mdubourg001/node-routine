## Routine

Inline, Promise based wrapper around JS Web Workers

### Usage

Using `async / await`:

```javascript
import { routine } from "./routine";

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
import { routine } from "./routine";

const multiply = (a, b, c) => a * b * c;

routine(multiply, 2, 3, 10).then(
  console.log // => 60
);
```
