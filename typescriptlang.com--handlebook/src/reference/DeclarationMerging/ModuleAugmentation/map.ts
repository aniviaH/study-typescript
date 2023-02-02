import { Observable } from "./observable";

// Observable.prototype.map = function (f) { // Property 'map' does not exist on type 'Observable<any>'.
//   // ... another exercise for the reader
// };

declare module "./observable" {
  interface Observable<T> {
    map<U>(f: (x: T) => U): Observable<U>
  }
}

Observable.prototype.map = function (f) {
  // ... another exercise for the reader
  return new Observable()
};