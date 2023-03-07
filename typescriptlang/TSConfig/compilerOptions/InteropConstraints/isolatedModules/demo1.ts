import { SomeType, someFunction } from './module'

someFunction()

export { SomeType, someFunction }
// Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'.