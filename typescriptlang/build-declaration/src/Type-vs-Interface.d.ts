declare type BirdType = {
    wings: 2;
};
interface BirdInterface {
    wings: 2;
}
declare const bird1: BirdType;
declare const bird2: BirdInterface;
declare const bird3: BirdInterface;
declare type Owl = {
    nocturnal: true;
} & BirdType;
declare type Robin = {
    nocturnal: false;
} & BirdInterface;
interface Peacock extends BirdType {
    colourful: true;
    flies: false;
}
interface Chicken extends BirdInterface {
    colourful: false;
    flies: false;
}
declare let owl: Owl;
declare let chicken: Chicken;
interface Kitten {
    purrs: boolean;
}
interface Kitten {
    colour: string;
}
declare type Puppy = {
    color: string;
};
//# sourceMappingURL=Type-vs-Interface.d.ts.map