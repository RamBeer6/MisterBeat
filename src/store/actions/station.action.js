import { stationService } from '../../services/station.service'

export function loadSongs(stationId, filterBy) {
  return async (dispatch) => {
    try {
      let songs
      // console.log('action:' , stationId);
      if (!stationId) songs = []
      else songs = await stationService.loadSongs(stationId, filterBy)
      dispatch({
        type: 'SET_SONGS',
        songs,
        currStationId: stationId,
      })
    } catch (err) {
      throw err
    }
  }
}

export function updateSongs(stationId, songs) {
  return async (dispatch) => {
    try {
      await stationService.updateSongs(stationId, songs)  
      dispatch({
        type: 'UPDATE_SONGS',
        songs,
        currStationId: stationId,
      })
    } catch (err) {
      throw err
    }
  }
}

export function removeSong(stationId, songId) {
  return async (dispatch) => {
    try {
      await stationService.removeSongStation(stationId, songId)
      dispatch({
        type: 'REMOVE_SONG',
        songId,
        currStationId: stationId,
      })
    } catch (err) {
      throw err
    }
  }
}
