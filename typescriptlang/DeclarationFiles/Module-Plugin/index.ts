import {greeter} from 'super-greeter'

// Normal Greeter API
greeter(2)
greeter('hello, world')

// Now we extend the object with a new function at runtime
import 'hyper-super-greeter'
greeter.hyperGreet()