import { storageService } from "./async-storage.service.js";
import { httpService } from "./http.service";

const STORAGE_KEY = "station";

const gTags = [
  {
    name: "Funk",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002f16913f0326b9d44bf78fc88",
    color: "F75E3D",
  },
  {
    name: "Happy",
    imgUrl: "https://i.scdn.co/image/ab67706f000000023e0130fcd5d106f1402b4707",
    color: "FCFF34",
  },
  {
    name: "Made for you",
    imgUrl: "https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe",
    color: "34FDFF",
  },
  {
    name: "Charts",
    imgUrl:
      "https://charts-images.scdn.co/assets/locale_en/regional/weekly/region_global_default.jpg",
    color: "FC34FF",
  },
  {
    name: "New releases",
    imgUrl: "https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112",
    color: "49FC2E",
  },
  {
    name: "Discover",
    imgUrl: "https://t.scdn.co/images/d0fb2ab104dc4846bdc56d72b0b0d785.jpeg",
    color: "D8963A",
  },
  {
    name: "Concert",
    imgUrl: "https://t.scdn.co/images/8cfa9cb1e43a404db76eed6ad594057c",
    color: "3A4AD8",
  },
  {
    name: "HipHop",
    imgUrl: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c",
    color: "E80000",
  },
  {
    name: "Pop",
    imgUrl: "https://t.scdn.co/images/0a74d96e091a495bb09c0d83210910c3",
    color: "8C00E8",
  },
  {
    name: "Country",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002a980b152e708b33c6516d848",
    color: "FF1FA9",
  },
  {
    name: "Rock",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002fe6d8d1019d5b302213e3730",
    color: "F75E3D",
  },
  {
    name: "Latin",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002f16913f0326b9d44bf78fc88",
    color: "F75E3D",
  },
  {
    name: "Workout",
    imgUrl: "https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15",
    color: "F75E3D",
  },
  {
    name: "Punk",
    imgUrl: "https://i.scdn.co/image/ab67706f0000000275251d7d488b0fd69e4c50bd",
    color: "F75E3D",
  },
  {
    name: "R&B",
    imgUrl: "https://i.scdn.co/image/ab67706f000000023c5a4aaf5df054a9beeb3d82",
    color: "F75E3D",
  },
  {
    name: "Welness",
    imgUrl: "https://i.scdn.co/image/ab67656300005f1ff234909e69a68d92ca0af6ca",
    color: "F75E3D",
  },
  {
    name: "Mood",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba",
    color: "F75E3D",
  },
  {
    name: "Indie",
    imgUrl: "https://i.scdn.co/image/ab67706f000000025f7327d3fdc71af27917adba",
    color: "F75E3D",
  },
  {
    name: "Funk",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002f16913f0326b9d44bf78fc88",
    color: "F75E3D",
  },
  {
    name: "Sleep",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002b70e0223f544b1faa2e95ed0",
    color: "F75E3D",
  },
  {
    name: "Mexican",
    imgUrl: "https://t.scdn.co/images/c765fa1ce6994fce8796d2d0d93c1e61.jpeg",
    color: "F75E3D",
  },
  {
    name: "Travel",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002ffa215be1a4c64e3cbf59d1e",
    color: "F75E3D",
  },
  {
    name: "Chill",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002c414e7daf34690c9f983f76e",
    color: "F75E3D",
  },
  {
    name: "Metal",
    imgUrl: "https://i.scdn.co/image/ab67706f0000000285704160b49125ac95099ec8",
    color: "F75E3D",
  },
  {
    name: "Classics",
    imgUrl: "https://i.scdn.co/image/ab67706f000000023e0130fcd5d106f1402b4707",
    color: "F75E3D",
  },
  {
    name: "Kpop",
    imgUrl: "https://i.scdn.co/image/ab67706f00000002978b9f4a4f40b430fd0d837e",
    color: "F75E3D",
  },
];


export const stationService = {
  query,
  loadSongs,
  getById,
  save,
  getTags,
  updateSongs,
  removeSongStation,
  addSongStation
}

async function query(filterBy = null) {
  const query = !filterBy?.txt ? '' : `?name=${filterBy.txt}`
  try {
    // return await httpService.get(`station${query}`)
    return await storageService
      .query(STORAGE_KEY)
      .then((stations) => {
        // console.log('stations service:' , stations);
        return stations.filter((station) => station.name.includes(query))
      }
      )
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function loadSongs(stationId, filterBy) {
  try {
    // console.log('loadsongs stationId:' , stationId)
    const station = await getById(stationId);
    // console.log('loadsongs from station:', station)
    return station.songs;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getById(stationId) {
  if (!stationId) return;
  try {
    // console.log('getById:' , stationId);
    // return await httpService.get(`/station/${stationId}`)
    return storageService.get(STORAGE_KEY, stationId)
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function save(station) {
  if (!station) station = _createStation()
  if (station._id) {
    return storageService.put(STORAGE_KEY, station)
  } else {
    return storageService.post(STORAGE_KEY, station)
  }
}


async function getTags() {
  try {
    return gTags
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function updateSongs(stationId, songs) {
  try {
    getById(stationId).then(station => {
      station.songs = songs
      save(station)
    })
    // console.log('need to update songs:' , songs);
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function removeSongStation(stationId, songId) {
  try {
    getById(stationId).then(station => {
      station.songs = station.songs.filter(song => song.id !== songId)
      return storageService.put(STORAGE_KEY, station)
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addSongStation(stationId, song) {
  try {
    getById(stationId).then(station => {
      station.songs.push(song)
      return storageService.put(STORAGE_KEY, station)
    })
  } catch (err) {
    console.log(err)
    throw err
  }
}

function _createStation() {
  return {
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
        id: 'ViwtNLUqkMY',
        title: 'Irreplaceable',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/2EwViQxSJJQ/default.jpg',
        addedBy: { _id: 'u102', userName: 'Muki Ram', imgUrl: 'img2.png' },
        addedAt: 162521765262,
        tags: ['Funk', 'Rock'],
        artist: 'Beyoncé',
        album: 'Irreplaceable',
        duration: '03:56',
      },
      {
        id: '7xwwuH_Z3WA',
        title: 'Love On Top',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/Ob7vObnFUJc/default.jpg',
        addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
        addedAt: 162521765262,
        tags: ['Rock', 'Happy'],
        artist: 'Beyoncé',
        album: 'Love On Top',
        duration: '04:13',
      },
      {
        id: 'pZ12_E5R3qc',
        title: 'Drunk in Love',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/p1JPKLa-Ofc/default.jpg',
        addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
        addedAt: 162521765262,
        tags: ['Rock', 'Happy'],
        artist: 'Beyoncé ft. JAY Z',
        album: 'Drunk in Love',
        duration: '03:50',
      },
      {
        id: 'WDZJPJV__bQ',
        title: 'Single Ladies',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/4m1EFMoRFvY/default.jpg',
        addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
        addedAt: 162521765262,
        tags: ['Rock', 'Happy'],
        artist: 'Beyoncé',
        album: 'Single Ladies',
        duration: '04:48',
      },
    ],
  }
}

// _createStations()
function _createStations() {
  const st1 = {
    _id: '1111',
    name: 'Beyonce Hits',
    tags: ['Happy', 'Chill'],
    createdAt: 1541652422,
    createdBy: {
      _id: 'u101',
      fullname: 'Puki Ben David',
      imgUrl: 'http://some-photo/',
    },
    imgUrl: 'https://i.scdn.co/image/ab67706c0000da8401bf247b51f811397ee74800',
    likedByUsers: [
      { _id: 'u106', userName: 'Muki6', imgUrl: 'img2.png' },
      { _id: 'u105', userName: 'Muki5', imgUrl: 'img2.png' },
    ],
    songs: [
      {
        id: 'ViwtNLUqkMY',
        title: 'Irreplaceable',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/2EwViQxSJJQ/default.jpg',
        addedBy: { _id: 'u102', userName: 'Muki Ram', imgUrl: 'img2.png' },
        addedAt: 162521765262,
        tags: ['Funk', 'Rock'],
        artist: 'Beyoncé',
        album: 'Irreplaceable',
        duration: '03:56',
      },
      {
        id: '7xwwuH_Z3WA',
        title: 'Love On Top',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/Ob7vObnFUJc/default.jpg',
        addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
        addedAt: 162521765262,
        tags: ['Rock', 'Happy'],
        artist: 'Beyoncé',
        album: 'Love On Top',
        duration: '04:13',
      },
      {
        id: 'pZ12_E5R3qc',
        title: 'Drunk in Love',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/p1JPKLa-Ofc/default.jpg',
        addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
        addedAt: 162521765262,
        tags: ['Rock', 'Happy'],
        artist: 'Beyoncé ft. JAY Z',
        album: 'Drunk in Love',
        duration: '03:50',
      },
      {
        id: 'WDZJPJV__bQ',
        title: 'Single Ladies',
        url: 'youtube/song.mp4',
        imgUrl: 'https://i.ytimg.com/vi/4m1EFMoRFvY/default.jpg',
        addedBy: { _id: 'u101', userName: 'Puki Ben David', imgUrl: 'img.png' },
        addedAt: 162521765262,
        tags: ['Rock', 'Happy'],
        artist: 'Beyoncé',
        album: 'Single Ladies',
        duration: '04:48',
      },
    ],
  }
  storageService.post(STORAGE_KEY, st1)
}
