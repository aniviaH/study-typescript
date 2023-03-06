import settings from './settings.json'
      // Cannot find module './settings.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.
      
const debug = settings.debug === true
const dry = settings.dry === 2
          // This comparison appears to be unintentional because the types 'boolean' and 'number' have no overlap.