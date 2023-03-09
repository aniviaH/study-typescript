function lookupHeadphonesManufacturer (color: 'blue' | 'black'): string { // Not all code paths return a value.
  if (color === 'blue') {
    return 'beats'
  } else {
    console.log('bose')
  }
}