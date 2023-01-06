// Sometimes you will have information about the type of a value that TypeScript can’t know about.

// For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, 
// but you might know that your page will always have an HTMLCanvasElement with a given ID.

// In this situation, you can use a type assertion to specify a more specific type:

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.

// You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:
const myCanvas2 = <HTMLCanvasElement>document.getElementById("main_canvas"); // 在 .tsx 文件中不能使用该方式，会与jsx的标签其实符冲突

/*  
  Reminder:
  Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion.
  There won’t be an exception or null generated if the type assertion is wrong.
*/

// const x = "hello" as number; // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
const x = "hello" as unknown as number;

// Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. 
// If this happens, you can use two assertions, first to any (or unknown, which we’ll introduce later), then to the desired type:
// const a = (expr as any) as T;
const expr = 1
const t = (expr as unknown) as string;
