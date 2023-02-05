import React from 'react'

// export {}

// JSX is an embeddable XML-like syntax. 
// It is meant to be transformed into valid JavaScript, though the semantics of that transformation are implementation-specific. 
// JSX rose to popularity with the React framework, but has since seen other implementations as well. 
// TypeScript supports embedding, type checking, and compiling JSX directly to JavaScript.


/** Basic usage */

// In order to use JSX you must do two things.
// 1.Name your files with a .tsx extension
// 2.Enable the jsx option

// TypeScript ships with three JSX modes: preserve, react, and react-native. 
// These modes only affect the emit stage - type checking is unaffected. 
// The preserve mode will keep the JSX as part of the output to be further consumed by another transform step (e.g. Babel). Additionally the output will have a .jsx file extension. 
// The react mode will emit React.createElement, does not need to go through a JSX transformation before use, and the output will have a .js file extension. 
// The react-native mode is the equivalent of preserve in that it keeps all JSX, but the output will instead have a .js file extension.

/* 
Mode	        Input	    Output	                                          Output File Extension
preserve	    <div />	  <div />	                                          .jsx
react	        <div />	  React.createElement("div")	                      .js
react-native	<div />	  <div />	                                          .js
react-jsx	    <div />	  _jsx("div", {}, void 0);	                        .js
react-jsxdev	<div />	  _jsxDEV("div", {}, void 0, false, {...}, this);	  .js 
*/

// You can specify this mode using either the jsx command line flag or the corresponding option jsx in your tsconfig.json file.

// *Note: You can specify the JSX factory function to use when targeting react JSX emit with jsxFactory option (defaults to React.createElement)

/** Type Checking */

// In order to understand type checking with JSX, you must first understand the difference between intrinsic elements and value-based elements.

// Given a JSX expression <expr />, expr may either refer to something intrinsic to the environment (e.g. a div or span in a DOM environment) or to a custom component that you’ve created. This is important for two reasons:

// 1.For React, intrinsic elements are emitted as strings (React.createElement("div")), whereas a component you’ve created is not (React.createElement(MyComponent)).
// 2.The types of the attributes being passed in the JSX element should be looked up differently. Intrinsic element attributes should be known intrinsically whereas components will likely want to specify their own set of attributes.

// TypeScript uses the same convention that React does for distinguishing between these.
// An intrinsic element always begins with a lowercase letter, and a value-based element always begins with an uppercase letter.


/** Intrinsic elements */

// Intrinsic elements are looked up on the special interface JSX.IntrinsicElements. 
// By default, if this interface is not specified, then anything goes and intrinsic elements will not be type checked
// However, if this interface is present, then the name of the intrinsic element is looked up as a property on the JSX.IntrinsicElements interface. For example:

// declare namespace JSX {
//   interface IntrinsicElements {
//     foo: any;
//   }
// }
<foo /> // ok
// {<bar /> // error}

// In the above example, <foo /> will work fine but <bar /> will result in an error since it has not been specified on JSX.IntrinsicElements.

// Note: You can also specify a catch-all string indexer on JSX.IntrinsicElements as follows:

// declare namespace JSX {
//   interface IntrinsicElements {
//     [elemName: string]: any;
//   }
// }


/** Value-based elements */

// Value-based elements are simply looked up by identifiers that are in scope.

import MyComponent from "./MyComponent";
<MyComponent />; // ok
{/* <SomeOtherComponent />; // error */}

// There are two ways to define a value-based element:
// 1.Function Component (FC)
// 2.Class Component

// Because these two types of value-based elements are indistinguishable from each other in a JSX expression, first TS tries to resolve the expression as a Function Component using overload resolution.
// If the process succeeds, then TS finishes resolving the expression to its declaration. If the value fails to resolve as a Function Component, TS will then try to resolve it as a class component. If that fails, TS will report an error.


/** Function Component */

// As the name suggests, the component is defined as a JavaScript function where its first argument is a props object. 
// TS enforces that its return type must be assignable to JSX.Element.

interface FooProp {
  name: string;
  X: number;
  Y: number;
}

declare function AnotherComponent(prop: { name: string }): JSX.Element;
function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name={prop.name} />;
}

const Button = (prop: { value: string }, context: { color: string }) => (
  <button />
);

// Because a Function Component is simply a JavaScript function, function overloads may be used here as well:

interface ClickableProps {
  children: JSX.Element[] | JSX.Element;
}

interface HomeProps extends ClickableProps {
  home: JSX.Element;
}

interface SideProps extends ClickableProps {
  side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element;
function MainButton(prop: ClickableProps): JSX.Element {
  // ...
  return (<div>click me</div>)
}

// Note: Function Components were formerly known as Stateless Function Components (SFC). As Function Components can no longer be considered stateless in recent versions of react, the type SFC and its alias StatelessComponent were deprecated.


/** Class Component */

// It is possible to define the type of a class component. 
// However, to do so it is best to understand two new terms: the element class type and the element instance type.

// Given <Expr />, the element class type is the type of Expr.
// So in the example above, if MyComponent was an ES6 class the class type would be that class’s constructor and statics.
// If MyComponent was a factory function, the class type would be that function.

// Once the class type is established, the instance type is determined by the union of the return types of the class type’s construct or call signatures (whichever is present). 
// So again, in the case of an ES6 class, the instance type would be the type of an instance of that class, and in the case of a factory function, it would be the type of the value returned from the function.

class MyComponent2 {
  render() {}
}
// use a construct signature
const myComponent2 = new MyComponent2();

// element class type => MyComponent2
// element instance type => { render: () => void }

function MyFactoryFunction() {
  return {
    render: () => {},
  };
}
// use a call signature
const myComponent3 = MyFactoryFunction();

// element class type => MyFactoryFunction
// element instance type => { render: () => void }

// The element instance type is interesting because it must be assignable to JSX.ElementClass or it will result in an error.
// By default JSX.ElementClass is {}, but it can be augmented to limit the use of JSX to only those types that conform to the proper interface.

class MyComponent4 {
  render() {
    return (<div>MyComponent4</div>)
  }
}
function MyFactoryFunction4() {
  return (<div></div>);
}

{/* <MyComponent4/>; // ok */}
// 'MyComponent4' cannot be used as a JSX component.
  // Its instance type 'MyComponent4' is not a valid JSX element.
    // Type 'MyComponent4' is missing the following properties from type 'ElementClass': context, setState, forceUpdate, props, and 2 more.

<MyFactoryFunction4 />; // ok

class NotAValidComponent {}
function NotAValidFactoryFunction() {
  return {};
}
{/* <NotAValidComponent />; // error */}
{/* <NotAValidFactoryFunction />; // error */}


/** Attribute type checking */

// The first step to type checking attributes is to determine the element attributes type. 
// This is slightly different between intrinsic and value-based elements.

// For intrinsic elements, it is the type of the property on JSX.IntrinsicElements

// element attributes type for 'foo' is '{bar?: boolean}'
<foo2 bar />;

// For value-based elements, it is a bit more complex. 
// It is determined by the type of a property on the element instance type that was previously determined. 
// Which property to use is determined by JSX.ElementAttributesProperty. 
// It should be declared with a single property. The name of that property is then used. 
// As of TypeScript 2.8, if JSX.ElementAttributesProperty is not provided, the type of first parameter of the class element’s constructor or Function Component’s call will be used instead.


declare class MyComponent5 {
  // specify the property on the element instance type
  props: {
    foo?: string;
  };
}
// element attributes type for 'MyComponent' is '{foo?: string}'
{/* <MyComponent5 foo="bar" />; */}


// The element attribute type is used to type check the attributes in the JSX. Optional and required properties are supported.

function MyComponent5 () {
  return (
    <div >MyComponent5</div>
  )
}
<foo3 requiredProp="bar"></foo3>; // ok
<foo3 requiredProp="bar" optionalProp={0} ></foo3>;
{/* <foo3></foo3>; // Property 'requiredProp' is missing in type '{}' but required in type '{ requiredProp: string; optionalProp?: number | undefined; }'. */}
{/* <foo3 requiredProp={0} />; // Type 'number' is not assignable to type 'string'. */}
{/* <foo3 requiredProp="bar" unknownProp />; */}
// Type '{ requiredProp: string; unknownProp: true; }' is not assignable to type '{ requiredProp: string; optionalProp?: number | undefined; }'.
// Property 'unknownProp' does not exist on type '{ requiredProp: string; optionalProp?: number | undefined; }'.
<foo3 requiredProp="bar" some-unknown-prop />; // ok, because 'some-unknown-prop' is not a valid identifier

// Note: If an attribute name is not a valid JS identifier (like a data-* attribute), it is not considered to be an error if it is not found in the element attributes type.

// Additionally, the JSX.IntrinsicAttributes interface can be used to specify extra properties used by the JSX framework which are not generally used by the components’ props or arguments - for instance key in React.
// Specializing further, the generic JSX.IntrinsicClassAttributes<T> type may also be used to specify the same kind of extra attributes just for class components (and not Function Components).
// In this type, the generic parameter corresponds to the class instance type.
// In React, this is used to allow the ref attribute of type Ref<T>.
// Generally speaking, all of the properties on these interfaces should be optional, unless you intend that users of your JSX framework need to provide some attribute on every tag.

// The spread operator also works:

const props = { requiredProp: "bar" };
<foo3 {...props} />; // ok

const badProps = {};
{/* <foo3 {...badProps} />; // error */}


/** Children Type Checking */

// In TypeScript 2.3, TS introduced type checking of children. 
// children is a special property in an element attributes type where child JSXExpressions are taken to be inserted into the attributes. 
// Similar to how TS uses JSX.ElementAttributesProperty to determine the name of props, TS uses JSX.ElementChildrenAttribute to determine the name of children within those props. 
// JSX.ElementChildrenAttribute should be declared with a single property.

(
  <div>
    <h1>Hello</h1>
  </div>
);

(
  <div>
    <h1>Hello</h1>
    World
  </div>
);

const CustomComp = (props: any) => <div>{props.children}</div>
(
  <CustomComp>
  <div>Hello World</div>
    {"This is just a JS expression..." + 1000}
  </CustomComp>
)

// You can specify the type of children like any other attribute. This will override the default type from, e.g. the React typings if you use them.

interface PropsType {
  children: JSX.Element
  name: string
}

class Component extends React.Component<PropsType, {}> {
  render() {
    return (
      <h2>
        {this.props.children}
      </h2>
    )
  }
}

// OK
<Component name="foo">
  <h1>Hello World</h1>
</Component>;

// Error: children is of type JSX.Element not array of JSX.Element
{/* <Component name="bar">
  <h1>Hello World</h1>
  <h2>Hello World</h2>
</Component> */}

// Error: children is of type JSX.Element not array of JSX.Element or string.
{/* <Component name="baz">
  <h1>Hello</h1>
  World
</Component> */}


/** The JSX result type */

// By default the result of a JSX expression is typed as any. 
// You can customize the type by specifying the JSX.Element interface.
// However, it is not possible to retrieve type information about the element, attributes or children of the JSX from this interface. It is a black box.



/** Embedding Expressions */

// JSX allows you to embed expressions between tags by surrounding the expressions with curly braces ({ }).

const aComponent = (
  <div>
    {["foo", "bar"].map((i) => (
      // <span>{i / 2}</span>
      <span>{i}</span>
    ))}
  </div>
);

// The above code will result in an error since you cannot divide a string by a number. The output, when using the preserve option, looks like:

// const aComponent = (
//   <div>
//     {["foo", "bar"].map(function (i) {
//       return <span>{i / 2}</span>;
//     })}
//   </div>
// );


/** React integration */

// To use JSX with React you should use the React typings.

// These typings define the JSX namespace appropriately for use with React.

/// <reference path="react.d.ts" />
// interface Props {
//   foo: string;
// }
// class MyComponent extends React.Component<Props, {}> {
//   render() {
//     return <span>{this.props.foo}</span>;
//   }
// }
// <MyComponent foo="bar" />; // ok
// <MyComponent foo={0} />; // error



/** Configuring JSX */

// There are multiple compiler flags which can be used to customize your JSX, which work as both a compiler flag and via inline per-file pragmas. To learn more see their tsconfig reference pages:

// [jsxFactory]
// [jsxFragmentFactory]
// [jsxImportSource]