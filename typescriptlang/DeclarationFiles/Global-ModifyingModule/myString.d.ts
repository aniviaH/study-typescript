declare global {
  interface String {
    fancyFormat(opt: StringFormatOptions): string
  }
}

export interface StringFormatOptions {
  fancinessLevel: number
}

export function doSomething(): void

export {}