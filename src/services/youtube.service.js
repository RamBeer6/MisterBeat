import axios from 'axios'
import moment from 'moment'
import { momentDurationFormatSetup } from 'moment-duration-format'
import { storageService } from './async-storage.service.js'

// const API_KEY = 'AIzaSyDsq0OG9zwORsX9yQajOipvd78Bg5_RP5w'
const API_KEY = 'AIzaSyBVK4cQLZslG8PqYinSqGVLL6wps_MbSdk';


export const youtubeService = {
  query,
  debounce
}

async function query(name) {
  if (!name) return
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${name}&maxResults=50`
  try {
    const { data } = await axios.get(url)
    const musicItems = _getMusicItems(data.items)
    const durations = await _getDurations(musicItems)
    const modifiedMusicItems = musicItems.map((item, idx) => Object.assign({}, item, durations[idx]))
    // console.log('query modifiedMusicItems:', modifiedMusicItems)
    return modifiedMusicItems
  } catch (err) {
    console.log(err)
    throw err
  }
}

function debounce(func, wait) {
  let timeoutIdx;
  return async function executedFunction(...args) {
      const later = () => {
          clearTimeout(timeoutIdx);
          func(...args);
      };

      clearTimeout(timeoutIdx);
      timeoutIdx = setTimeout(later, wait);
  };
}

function _getMusicItems(videos) {
  if (!videos) return

  return videos.map((video) => {
    return {
      id: video.id.videoId,
      title: video.snippet.title,
      imgUrl: video.snippet.thumbnails.medium.url,
    }
  })
}

async function _getDurations(musicItems) {
  if (!musicItems) return
  const ids = musicItems.map((item) => `id=${item.id}&`).join('')
  const url = `https://www.googleapis.com/youtube/v3/videos?${ids}&key=${API_KEY}&part=snippet,contentDetails,statistics,status`
  try {
      const { data } = await axios.get(url)
      return _durationFormat(data.items)
  } catch (err) {
    console.log(err)
    throw err
  }
}

function _durationFormat(videos) {
    return videos.map(video => {
        return {
            id: video.id,
            duration: moment.duration(video.contentDetails.duration).format('hh:mm:ss') 
        }
    })
}
