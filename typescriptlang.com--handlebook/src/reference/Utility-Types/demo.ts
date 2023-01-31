function toHex2(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex2> = toHex2.bind(5);

console.log(fiveToHex());