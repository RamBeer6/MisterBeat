import { storageService } from './async-storage.service.js'
import { httpService } from './http.service'

const STORAGE_KEY = 'station'

const gTags = [
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

export const stationService = {
  query,
  loadSongs,
  getById,
  save,
  getTags,
}

async function query(filterBy = null) {
  const query = !filterBy?.txt ? '' : `?name=${filterBy.txt}`
  try {
    // return await httpService.get(`station${query}`)
    return await storageService
      .query(STORAGE_KEY)
      .then((stations) => {
        console.log('stations service:' , stations);
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
    const station = await getById(stationId)
    // console.log('loadsongs from station:', station)
    return station.songs
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function getById(stationId) {
  if (!stationId) return
  try {
    // console.log('getById:' , stationId);
    // return await httpService.get(`/station/${stationId}`)
    return storageService.get(STORAGE_KEY, stationId)
  } catch (err) {
    console.log(err)
    throw err
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
    name: 'Beyonce JLO',
    tags: ['R&B', 'Chill'],
    createdAt: 1541652422,
    createdBy: {
      _id: 'u101',
      fullname: 'Puki Ben David',
      imgUrl: 'http://some-photo/',
    },
    imgUrl: 'https://mosaic.scdn.co/300/ab67616d00001e023718df7…6c1f1a3b5ab67616d00001e02bfa0a1de59696c7a6fe15ebb',
    likedByUsers: [
      { _id: 'u109', userName: 'Muki9', imgUrl: 'img2.png' },
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
