/// <reference path="react.d.ts" />

import React from 'react'

class MyComponent extends React.Component<Props, {}> {
  render() {
    return <span>{this.props.foo}</span>;
  }
}
<MyComponent foo="bar" />; // ok
{/* <MyComponent foo={0} />; // error */}
// No overload matches this call.
// Overload 1 of 2, '(props: Props | Readonly<Props>): MyComponent', gave the following error.
  // Type 'number' is not assignable to type 'string'.
// Overload 2 of 2, '(props: Props, context: any): MyComponent', gave the following error.
  // Type 'number' is not assignable to type 'string'.

