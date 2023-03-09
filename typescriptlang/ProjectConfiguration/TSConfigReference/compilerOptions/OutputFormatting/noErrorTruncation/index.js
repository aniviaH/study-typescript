var x = {
    propertyWithAnExceedinglyLongName1: '1',
    propertyWithAnExceedinglyLongName2: '1',
    propertyWithAnExceedinglyLongName3: '1',
    propertyWithAnExceedinglyLongName4: '1',
    propertyWithAnExceedinglyLongName5: '1',
    propertyWithAnExceedinglyLongName6: '1',
    propertyWithAnExceedinglyLongName7: '1',
    propertyWithAnExceedinglyLongName8: '1'
};
// String representation of type of 'x' should be truncated in error message
var s = x;
// Type '{ propertyWithAnExceedinglyLongName1: string; propertyWithAnExceedinglyLongName2: string; propertyWithAnExceedinglyLongName3: string; propertyWithAnExceedinglyLongName4: string; propertyWithAnExceedinglyLongName5: string; propertyWithAnExceedinglyLongName6: string; propertyWithAnExceedinglyLongName7: string; propert...' is not assignable to type 'string'.
// Type '{ propertyWithAnExceedinglyLongName1: string; propertyWithAnExceedinglyLongName2: string; propertyWithAnExceedinglyLongName3: string; propertyWithAnExceedinglyLongName4: string; propertyWithAnExceedinglyLongName5: string; propertyWithAnExceedinglyLongName6: string; propertyWithAnExceedinglyLongName7: string; propertyWithAnExceedinglyLongName8: string; }' is not assignable to type 'string'.
