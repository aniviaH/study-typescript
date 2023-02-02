import { Observable } from "./observable";
import "./map";

let oo: Observable<number> = new Observable();
oo.map((x) => x.toFixed());