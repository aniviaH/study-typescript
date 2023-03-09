interface UserDefaults {
  colorThemeOverride?: 'dark' | 'light'
}

declare function getUserSettings () : UserDefaults

const settings = getUserSettings()
settings.colorThemeOverride = 'dark'
settings.colorThemeOverride = 'light'
settings.colorThemeOverride = undefined // Type 'undefined' is not assignable to type '"dark" | "light"' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the type of the target.