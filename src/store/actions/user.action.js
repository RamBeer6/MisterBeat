import { stationService } from '../../services/station.service'
import { userService } from '../../services/user.service'

export function likeSong(song, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.addSongToLiked(song, user)
      dispatch({
        type: 'SET_USER',
        user: updatedUser,
      })
    } catch (err) {
      throw err
    }
  }
}

export function unlikeSong(song, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.removeSongFromLiked(song, user)
      dispatch({
        type: 'SET_USER',
        user: updatedUser,
      })
    } catch (err) {
      throw err
    }
  }
}

export function likeStation(stationId, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.addStationToLiked(stationId, user)
      console.log('like station:' , updatedUser);
      dispatch({
        type: 'SET_USER',
        user: updatedUser,
      })
    } catch (err) {
      throw err
    }
  }
}

export function unlikeStation(stationId, user) {
  return async (dispatch) => {
    try {
      const updatedUser = await stationService.removeStationFromLiked(stationId, user)
      dispatch({
        type: 'SET_USER',
        user: updatedUser,
      })
    } catch (err) {
      throw err
    }
  }
}

export function updateLikedSongs(songs) {
  return async (dispatch) => {
    try {
      const updatedUser = await userService.updateLikedSongs(songs)  
      dispatch({
        type: 'SET_USER',
        user: updatedUser,
      })
    } catch (err) {
      throw err
    }
  }
}
