import "@babel/polyfill";

const routine = (fn: (...args: any[]) => any, ...args: any[]): Promise<any> => {
  if (!window.Worker) throw "Browser does not support the Worker API.";

  const wrapped = (): any => {
    onmessage = (event: MessageEvent) => {
      // data are actually the args given to the wrapped function
      const data: any = event.data;
      const result = fn.apply(null, data);
      postMessage(result);
    };
  };

  const wrappedBody = wrapped
    .toString()
    .replace(/^[^{]*{\s*/, "")
    .replace(/\s*}[^}]*$/, "") // making the function a "file"
    .replace(/fn/, `(${fn.toString()})`); // replacing the wrapped fn by it's body

  const worker = new Worker(
    URL.createObjectURL(new Blob([wrappedBody], { type: "text/javascript" }))
  );

  worker.postMessage(args);

  return new Promise(resolve => {
    worker.onmessage = (event: MessageEvent) => resolve(event.data);
  });
};

export { routine };
