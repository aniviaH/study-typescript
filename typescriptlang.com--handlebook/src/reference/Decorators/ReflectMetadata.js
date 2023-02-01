var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import "reflect-metadata";
class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Line {
    _start = { x: 0, y: 0 };
    _end = { x: 100, y: 100 };
    set start(value) {
        this._start = value;
    }
    get start() {
        return this._start;
    }
    set end(value) {
        this._end = value;
    }
    get end() {
        return this._end;
    }
}
__decorate([
    validate,
    __metadata("design:type", Point),
    __metadata("design:paramtypes", [Point])
], Line.prototype, "start", null);
__decorate([
    validate,
    __metadata("design:type", Point),
    __metadata("design:paramtypes", [Point])
], Line.prototype, "end", null);
function validate(target, propertyKey, descriptor) {
    let set = descriptor.set;
    descriptor.set = function (value) {
        let type = Reflect.getMetadata("design:type", target, propertyKey);
        console.log('type: ', type); // type:  [class Point]
        if (!(value instanceof type)) {
            throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
        }
        set.call(this, value);
    };
}
const line = new Line();
line.start = new Point(0, 0);
// @ts-ignore
line.end = {};
// Fails at runtime with:
// > Invalid type, got object not Point
// TypeError: Invalid type, got object not Point.