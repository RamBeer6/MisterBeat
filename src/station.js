// Guidlines:
// *. currently no better API than youtube...
// *. no need for song store, it is part of the station

// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart component - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....

// server.js
// Guidlines:
// *. currently no better API than youtube...
// *. no need for song store, it is part of the station
// Pages, Cmps:
// HomePage render 2 stations => link StationDetails
// Add station
// AppPlayer (initially rendered at StationDetails, later in footer)
//   Smart component - connected to store:
//   -. stationModule.currentlyPlayingUrl
//   -. stationModule.dispatch(nextSong)
// Filtering
// StationList, StationPreview
// StationDetails - Make it amazing
// D & D Later....
// server.js


var gTags = [
  'Funk',
  'Happy',
  'Made for you',
  'Charts',
  'New releases',
  'Discover',
  'Concert',
  'HipHop',
  'Pop',
  'Country',
  'Rock',
  'Latin',
  'Workout',
  'Punk',
  'R&B',
  'Welness',
  'Mood',
  'Indie',
  'Sleep',
  'Mexican',
  'Travel',
  'Chill',
  'Metal',
  'Classics',
  'Kpop',
];
var station = {
  _id: '5cksxjas89xjsa8xjsa8jxs09',
  name: 'Coding Mode',
  tags: ['Chill', 'Workout', 'Metal'],
  createdAt: 1541652422,
  createdBy: {
    _id: 'u101',
    fullname: 'Puki Ben David',
    imgUrl: 'http://some-photo/',
  },
  likedByUsers: [
    { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
    { _id: 'u102', userName: 'Muki Ram', imgUrl: 'img2.png' },
  ],
  songs: [
    {
<<<<<<< HEAD
      id: 's1001',
      title: 'Eye of the tiger',
      url: 'youtube/song.mp4',
      imgUrl: 'https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg',
      addedBy: { _id: 'u102', userName: 'Muki Ram', imgUrl: 'img2.png' },
=======
      id: "s1001",
      title: "Eye of the tiger",
      url: "youtube/song.mp4",
      imgUrl: "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
      addedBy: { _id: "u102", userName: "Muki Ram", imgUrl: "img2.png" },
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
      addedAt: 162521765262,
      tags: ['Funk', 'Rock'],
      artist: 'Survivor Band',
      album: 'Eye of the tiger',
      duration: 60 * 4 + 30,
    },
    {
<<<<<<< HEAD
      id: 'mUkfiLjooxs',
      title: 'We Are the Champions',
      url: 'youtube/song.mp4',
      imgUrl: 'https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg',
      addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
=======
      id: "mUkfiLjooxs",
      title: "We Are the Champions",
      url: "youtube/song.mp4",
      imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
      addedBy: { _id: "u101", userName: "Puki Ben David", imgUrl: "img.png" },
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
      addedAt: 162521765262,
      tags: ['Rock', 'Happy'],
      artist: 'Queen',
      album: 'News of the World',
      duration: 60 * 3 + 10,
    },
  ],
};

const users = [
  {
<<<<<<< HEAD
    _id: 'u101',
    userName: 'Puki Ben David',
    password: '1234',
    mail: 'puki@gmail.com',
    imgUrl: 'img.png',
    createdStations: ['station1', 'station2'], //change to id's later
    favoriteStations: ['station3', 'favoriteSongs'], //change to id's later
  },
  {
    _id: 'u102',
    userName: 'Muki Ram',
    password: '5678',
    mail: 'muki@gmail.com',
    imgUrl: 'img2.png',
    createdStations: ['station3', 'station4'], //change to id's later
    favoriteStations: ['station1', 'favoriteSongs'], //change to id's later
=======
    _id: "u101",
    userName: "Puki Ben David",
    password: "1234",
    mail: "puki@gmail.com",
    imgUrl: "img.png",
    favoriteSongs: ["station3", "mystation"], //id later
  },
  {
    _id: "u102",
    userName: "Muki Ram",
    password: "5678",
    mail: "muki@gmail.com",
    imgUrl: "img2.png",
    favoriteSongs: ["station1", "mystation"],// id later
>>>>>>> 21420bc54d6843dee32b29e2fac48ce52ea9cca2
  },
];
