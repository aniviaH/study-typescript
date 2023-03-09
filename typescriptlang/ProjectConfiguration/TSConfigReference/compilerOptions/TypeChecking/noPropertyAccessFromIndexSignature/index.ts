interface GameSettings {
  // Known up-front propertities
  speed: 'fast' | 'medium' | 'slow',
  quality: 'high' | 'low',

  // Assume anything unknown to the interface is a string
  [key: string]: string
}

declare function getSetting(): GameSettings

const setting = getSetting()
setting.speed // (property) GameSettings.speed: "fast" | "medium" | "slow"
setting.quality // (property) GameSettings.quality: "high" | "low"

// Unknown key accessort are allowed on this object, and are `string`
// setting.username // Property 'username' comes from an index signature, so it must be accessed with ['username'].

setting['username']

