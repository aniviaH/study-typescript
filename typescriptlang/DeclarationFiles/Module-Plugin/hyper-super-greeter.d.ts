import {greeter} from 'super-greeter'

export module 'super-greeter' {
  export interface GreetingFunction {
    /** Greets even better! */
    hyperGreet(): void
  }
}