declare module 'super-greeter' {
  export interface GreetingFunction {
    (name: string): void
    (time: number): void
  }

  export const greeter: GreetingFunction
}
