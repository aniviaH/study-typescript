class Album {
  setup () {
    // Default behavior
  }
}

class MLAlbum extends Album {
  override setup () {
    // Override to get info from algorithm
  }
}

class SharedAlbum extends Album {
  setup () { // This member must have an 'override' modifier because it overrides a member in the base class 'Album'.
    console.log('setup')
  }

  download (url: string) {
    // Override to get info from many sources
  }
}

