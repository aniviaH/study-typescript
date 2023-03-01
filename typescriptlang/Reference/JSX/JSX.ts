declare namespace JSX {
  interface IntrinsicElements {
    foo: any;
    foo2: { bar?: boolean };
    foo3: { requiredProp: string; optionalProp?: number };
    [elementName: string]: any,
  }

  interface ElementAttributesProperty {
    // props: any; // specify the property name to use
  }

  interface ElementChildrenAttribute {
    // children: {}; // specify children name to use
  }

  // interface Element {

  // }

  // interface ElementClass {
  //   render: any;
  // }
}

