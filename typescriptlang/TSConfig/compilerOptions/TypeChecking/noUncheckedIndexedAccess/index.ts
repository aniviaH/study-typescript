interface EnvironmentVars {
  NAME: string
  OS: string

  // Unknown properties are covered by this index signature.
  [propName: string]: string
}

// declare const env: EnvironmentVars
declare function getEnv (): EnvironmentVars

const env = getEnv()

// Declared as existing
const sysName = env.NAME
const os = env.OS
    // const os: string

// Not declared, but because of the index signature, then is is considerd a string
const nodeEnv = env.NODE_ENV
    // const nodeEnv: string

// Turn on `noUncheckedIndexedAccess`
const nodeEnv2 = env.NODE_ENV

const node = env['node']

env.node
