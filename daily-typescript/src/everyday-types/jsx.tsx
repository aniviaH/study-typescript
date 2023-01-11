function Component1 () {
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  // const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas");
  {/* JSX element 'HTMLCanvasElement' has no corresponding closing tag.
  'HTMLCanvasElement' cannot be used as a JSX component.
  Its instance type 'HTMLCanvasElement' is not a valid JSX element.
    Type 'HTMLCanvasElement' is missing the following properties from type 'ElementClass': render, context, setState, forceUpdate, and 3 more.
    Unexpected token. Did you mean `{'}'}` or `&rbrace;`?
    '</' expected. */}
  return (
    <>
      <h1>11</h1>

      <canvas id="main_canvas"></canvas>
    </>
  )
}