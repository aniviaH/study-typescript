export {}

const enum Album {
  JimmyEatWorldFutures = 1,
  TubRingZooHypothesis = 2,
  DogFashionDiscoAdultery = 3,
}

const selectedAlbum = Album.JimmyEatWorldFutures

if (selectedAlbum === Album.JimmyEatWorldFutures) {
  console.log('That is a great choice.');
}
